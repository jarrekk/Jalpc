#!/usr/bin/env python3
"""Import mapped Tistory posts into Jekyll _posts."""

from __future__ import annotations

import argparse
import html
import json
import re
import sys
import unicodedata
import urllib.request
from collections import OrderedDict
from datetime import datetime
from pathlib import Path

try:
    from bs4 import BeautifulSoup
except ImportError as exc:  # pragma: no cover
    raise SystemExit(
        "Missing dependency: beautifulsoup4. Install it with "
        "`python3 -m pip install beautifulsoup4`."
    ) from exc


ROOT = Path(__file__).resolve().parent.parent
POSTS_DIR = ROOT / "_posts"
DEFAULT_MAPPING_FILE = ROOT / "_data" / "tistory_import_map.json"
DEFAULT_INDEX_FILE = ROOT / "TISTORY_IMPORT_INDEX.md"
BASE_URL = "https://sanghole.tistory.com"

ICON_MAP = {
    "Development": "fa-terminal",
    "CTF-Wargame": "fa-flag",
    "TechnicalDocument": "fa-file-text-o",
    "Paper-Conference": "fa-book",
    "Contest-Certification": "fa-trophy",
    "Etc": "fa-sticky-note-o",
}


def fetch_text(url: str) -> str:
    req = urllib.request.Request(
        url,
        headers={
            "User-Agent": (
                "Mozilla/5.0 (X11; Linux x86_64) "
                "AppleWebKit/537.36 (KHTML, like Gecko) "
                "Chrome/123.0 Safari/537.36"
            )
        },
    )
    with urllib.request.urlopen(req, timeout=30) as response:
        return response.read().decode("utf-8", "ignore")


def slugify(text: str) -> str:
    normalized = unicodedata.normalize("NFKD", html.unescape(text))
    ascii_text = normalized.encode("ascii", "ignore").decode("ascii").lower()
    slug = re.sub(r"[^a-z0-9]+", "-", ascii_text).strip("-")
    return slug or "post"


def quote_yaml_string(value: str) -> str:
    return json.dumps(value, ensure_ascii=False)


def discover_posts(max_pages: int) -> OrderedDict[int, str]:
    discovered: OrderedDict[int, str] = OrderedDict()
    for page in range(1, max_pages + 1):
        url = BASE_URL + ("/" if page == 1 else f"/?page={page}")
        raw = fetch_text(url)
        matches = re.findall(
            r'<a href="/(\d+)"[\s\S]*?<span class="title">(.*?)</span>',
            raw,
        )
        if not matches:
            break
        for post_id, raw_title in matches:
            pid = int(post_id)
            if pid not in discovered:
                title = html.unescape(re.sub(r"<.*?>", "", raw_title).strip())
                discovered[pid] = title
    return discovered


def discover_categories() -> list[dict[str, object]]:
    home = fetch_text(BASE_URL + "/")
    categories: list[dict[str, object]] = []
    for name, count in re.findall(
        r'class="(?:link_item|link_sub_item)">\s*([^<]+?)\s*'
        r'<span class="c_cnt">\((\d+)\)</span>',
        home,
    ):
        categories.append({"name": name.strip(), "count": int(count)})
    uncategorized = sum(
        1
        for pid in discover_posts(10)
        if parse_post(pid)["source_category"] == "카테고리 없음"
    )
    if uncategorized:
        categories.append({"name": "카테고리 없음", "count": uncategorized})
    return categories


def parse_post(post_id: int) -> dict[str, object]:
    raw = fetch_text(f"{BASE_URL}/{post_id}")
    soup = BeautifulSoup(raw, "html.parser")

    title_node = soup.select_one(".hgroup h1")
    date_node = soup.select_one(".post-meta .date")
    category_node = soup.select_one(".hgroup .category")
    content_node = soup.select_one(".tt_article_useless_p_margin.contents_style")

    if not title_node or not date_node or not content_node:
        raise RuntimeError(f"Failed to parse Tistory post {post_id}")

    for tag in content_node.select("script, style"):
        tag.decompose()

    for node in content_node.select("[src]"):
        src = node.get("src", "")
        if src.startswith("//"):
            node["src"] = "https:" + src
    for node in content_node.select("[href]"):
        href = node.get("href", "")
        if href.startswith("//"):
            node["href"] = "https:" + href

    return {
        "id": post_id,
        "title": html.unescape(title_node.get_text(" ", strip=True)),
        "date": datetime.strptime(
            date_node.get_text(" ", strip=True), "%Y. %m. %d. %H:%M"
        ),
        "source_category": html.unescape(
            category_node.get_text(" ", strip=True) if category_node else ""
        ),
        "content_html": content_node.decode_contents().strip(),
        "url": f"{BASE_URL}/{post_id}",
    }


def load_mapping(path: Path) -> dict[str, object]:
    return json.loads(path.read_text(encoding="utf-8"))


def existing_source_urls() -> set[str]:
    urls: set[str] = set()
    for post_file in POSTS_DIR.glob("*.md"):
        text = post_file.read_text(encoding="utf-8", errors="ignore")
        match = re.search(
            r"Source: \[(https://sanghole\.tistory\.com/\d+)\]",
            text,
        )
        if match:
            urls.add(match.group(1))
    return urls


def build_front_matter(meta: dict[str, object], category: str, tags: list[str]) -> str:
    title = str(meta["title"])
    keywords = ",".join(dict.fromkeys([title, category] + tags))
    tag_values = ", ".join(quote_yaml_string(tag) for tag in tags)
    return (
        "---\n"
        "layout: post\n"
        f"title: {quote_yaml_string(title)}\n"
        f"date: {meta['date'].strftime('%Y-%m-%d %H:%M:%S')} +0900\n"
        f"desc: {quote_yaml_string(title)}\n"
        f"keywords: {quote_yaml_string(keywords)}\n"
        f"categories: [{category}]\n"
        f"tags: [{tag_values}]\n"
        f"icon: {ICON_MAP.get(category, 'fa-file-text-o')}\n"
        "---\n\n"
    )


def escape_liquid_markup(content: str) -> str:
    return (
        content.replace("{{", "&#123;&#123;")
        .replace("}}", "&#125;&#125;")
        .replace("{%", "&#123;%")
        .replace("%}", "%&#125;")
    )


def write_post(meta: dict[str, object], rule: dict[str, object], default_tags: list[str]) -> Path:
    category = str(rule["category"])
    tags = list(dict.fromkeys([*rule.get("tags", []), *default_tags]))
    front_matter = build_front_matter(meta, category, tags)
    body = (
        front_matter
        + f"> Source: [{meta['url']}]({meta['url']})\n\n"
        + escape_liquid_markup(str(meta["content_html"]).strip())
        + "\n"
    )
    filename = (
        f"{meta['date'].strftime('%Y-%m-%d')}-"
        f"{meta['id']}-{slugify(str(meta['title']))}.md"
    )
    output_path = POSTS_DIR / filename
    output_path.write_text(body, encoding="utf-8")
    return output_path


def write_index(
    index_path: Path,
    discovered: OrderedDict[int, str],
    categories: list[dict[str, object]],
    rules: dict[str, dict[str, object]],
) -> None:
    by_category: OrderedDict[str, list[tuple[str, str, str]]] = OrderedDict()
    for pid in discovered:
        meta = parse_post(pid)
        source_category = str(meta["source_category"] or "카테고리 없음")
        by_category.setdefault(source_category, [])
        rule = rules.get(str(pid))
        suffix = ""
        if rule:
            suffix = f" => {rule['category']}"
            tags = rule.get("tags") or []
            if tags:
                suffix += f" | tags: {', '.join(tags)}"
        by_category[source_category].append(
            (str(meta["title"]), str(meta["url"]), suffix)
        )

    lines = [
        "# Tistory Import Index",
        "",
        f"- Source: {BASE_URL}/",
        f"- Collected on: {datetime.now().strftime('%Y-%m-%d')}",
        f"- Total posts found: {len(discovered)}",
        "",
        "## Categories",
        "",
    ]
    for category in categories:
        lines.append(f"- {category['name']} ({category['count']})")
    lines.extend(["", "## Posts By Category", ""])

    for source_category, items in by_category.items():
        lines.append(f"### {source_category}")
        lines.append("")
        for title, url, suffix in items:
            lines.append(f"- [{title}]({url}){suffix}")
        lines.append("")

    index_path.write_text("\n".join(lines).rstrip() + "\n", encoding="utf-8")


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--mapping-file",
        type=Path,
        default=DEFAULT_MAPPING_FILE,
        help="JSON mapping file for Tistory post categories/tags.",
    )
    parser.add_argument(
        "--index-file",
        type=Path,
        default=DEFAULT_INDEX_FILE,
        help="Markdown file to write the discovered Tistory index to.",
    )
    parser.add_argument(
        "--max-pages",
        type=int,
        default=10,
        help="Maximum number of paginated Tistory listing pages to scan.",
    )
    parser.add_argument(
        "--write-index",
        action="store_true",
        help="Refresh the markdown index file.",
    )
    parser.add_argument(
        "--write-posts",
        action="store_true",
        help="Create mapped Jekyll posts in _posts.",
    )
    parser.add_argument(
        "--force",
        action="store_true",
        help="Overwrite even if the source URL already exists in _posts.",
    )
    args = parser.parse_args()

    if not args.write_index and not args.write_posts:
        parser.error("Choose at least one of --write-index or --write-posts.")

    mapping = load_mapping(args.mapping_file)
    default_tags = list(mapping.get("default_tags", []))
    rules = {str(k): v for k, v in mapping.get("posts", {}).items()}
    discovered = discover_posts(args.max_pages)

    if args.write_index:
        categories = discover_categories()
        write_index(args.index_file, discovered, categories, rules)
        print(f"wrote index: {args.index_file}")

    if args.write_posts:
        existing_urls = existing_source_urls()
        created = []
        skipped = []
        missing = []
        for post_id in discovered:
            rule = rules.get(str(post_id))
            if not rule:
                missing.append(post_id)
                continue
            meta = parse_post(post_id)
            if not args.force and str(meta["url"]) in existing_urls:
                skipped.append(post_id)
                continue
            created.append(write_post(meta, rule, default_tags))
        for path in created:
            print(f"created: {path.relative_to(ROOT)}")
        if skipped:
            print("skipped existing:", ", ".join(map(str, skipped)))
        if missing:
            print("missing mapping:", ", ".join(map(str, missing)))

    return 0


if __name__ == "__main__":
    sys.exit(main())
