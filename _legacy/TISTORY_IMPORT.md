# Tistory Import Workflow

이 저장소는 Tistory 글을 Jekyll `_posts`로 가져오는 스크립트를 포함합니다.

## 파일

- 매핑 파일: `_data/tistory_import_map.json`
- 가져오기 스크립트: `scripts/import_tistory.py`
- 인덱스 출력: `TISTORY_IMPORT_INDEX.md`

## 새 글 가져오는 순서

1. Tistory에 새 글을 올린다.
2. 인덱스를 갱신한다.

```bash
python3 scripts/import_tistory.py --write-index
```

3. `TISTORY_IMPORT_INDEX.md`를 보고 새 글의 post id를 확인한다.
4. `_data/tistory_import_map.json`에 새 post id의 `category`와 `tags`를 추가한다.
5. 실제 포스트 파일을 생성한다.

```bash
python3 scripts/import_tistory.py --write-posts
```

기본 동작:
- 이미 `_posts`에 들어간 Tistory URL은 자동으로 건너뜁니다.
- 매핑이 없는 글은 생성하지 않고 `missing mapping`으로 출력합니다.

## 다시 전체 덮어쓰기

```bash
python3 scripts/import_tistory.py --write-posts --force
```

## 로컬 Jekyll 확인

Ruby/Bundler가 설치된 뒤:

```bash
bundle install
bundle exec jekyll serve
```

## 카테고리 규칙

- `Development`
- `CTF-Wargame`
- `TechnicalDocument`
- `Paper-Conference`
- `Etc`

이 값들은 현재 `blog/*.html` 카테고리 페이지와 맞춰져 있습니다.
