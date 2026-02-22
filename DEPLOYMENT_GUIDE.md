# 🚀 배포 가이드 (Deployment Guide)

본 가이드는 **[Deployer_Agent]** 가 작성한 프로젝트 배포 최종 안내서입니다.

## 1. Supabase 데이터베이스 세팅
1. [Supabase](https://supabase.com/)에 로그인하여 새 프로젝트를 생성합니다.
2. `SQL Editor` 메뉴로 이동하여 새 쿼리를 생성합니다.
3. 프로젝트 내 `supabase/migrations/20260222000000_initial_schema.sql` 파일의 전체 내용을 복사하여 실행(Run)합니다.
    - 이 쿼리는 `media` 테이블을 생성하고 RLS 정책을 설정하며, `portfolio-media`라는 퍼블릭 Storage 버킷을 자동 생성합니다.
4. `Authentication` > `Providers` 메뉴에서 이메일 로그인을 활성화합니다.
5. `Authentication` > `Users` 메뉴에서 관리자 계정(이메일, 비밀번호)을 직접 1개 생성합니다.
6. `Project Settings` > `API` 에서 `Project URL`과 `anon public` 키를 복사합니다.

## 2. Vercel 배포 세팅
1. 프로젝트를 GitHub 브랜치에 Push 합니다.
2. [Vercel](https://vercel.com/)에 로그인 후 `Add New...` > `Project`를 클릭합니다.
3. Push한 GitHub 저장소를 Import 합니다.
4. **Environment Variables** (환경 변수) 섹션을 열고 다음 값을 붙여넣습니다:
    - `NEXT_PUBLIC_SUPABASE_URL` = (위에서 복사한 URL)
    - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = (위에서 복사한 Key)
5. `Deploy` 버튼을 클릭합니다. Vercel이 자동으로 Next.js 앱을 빌드하고 호스팅을 시작합니다.

## 3. 최종 확인
- 배포된 Vercel 도메인으로 접속하여 퍼블릭 갤러리가 열리는지 확인합니다.
- `/login` 경로로 접속하여 Supabase에서 만든 관리자 계정으로 로그인을 테스트합니다.
- 대시보드에서 `업로드` 기능을 사용해 Storage Bucket에 파일이 제대로 올라가고 홈 갤러리에 노출되는지 점검합니다.
