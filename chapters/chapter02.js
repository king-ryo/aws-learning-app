// ========================================
// 第2章: ユーザー管理サービス（IAM）【短縮版】
// ========================================
const chapter02 = {
  id: 2,
  title: "ユーザー管理サービス（IAM）",
  sections: [
    // セクション1: この章で学ぶこと
    {
      id: "2-intro",
      title: "この章で学ぶこと",
      type: "explanation",
      content: `
        <div class="chapter-container">
          <div class="chapter-intro-banner">
            <div class="chapter-number">CHAPTER 02</div>
            <h1 class="chapter-main-title">ユーザー管理サービス（IAM）</h1>
            <p class="chapter-subtitle">AWSセキュリティの基盤を理解する</p>
          </div>

          <div class="learning-goals">
            <h3 class="learning-goals-title">&#127919; この章の学習目標</h3>
            <ul class="learning-goals-list">
              <li>IAMとは何かを理解する</li>
              <li>ルートユーザーとIAMユーザーの違いを説明できる</li>
              <li>IAMの主要な構成要素を理解する</li>
              <li>IAMユーザーによるサインイン方法を知る</li>
            </ul>
          </div>

          <h2 class="section-title">&#128218; はじめに</h2>

          <p class="text-paragraph">
            前章でAWSアカウントを作成しました。しかし、アカウント作成時の認証情報（ルートユーザー）を
            そのまま使い続けることは<span class="highlight">セキュリティ上、非常に危険</span>です。
          </p>

          <p class="text-paragraph">
            この章では、AWSのセキュリティの要である<strong><span class="aws-keyword" data-service="IAM">IAM</span>（Identity and Access Management）</strong>を学びます。
          </p>

          <div class="warning-box">
            <div class="warning-box-title">&#9888; なぜIAMが重要なのか</div>
            <p>
              ルートユーザーの認証情報が漏洩すると、<strong>すべてのリソースが危険にさらされます</strong>。
              過去には、数百万円の不正利用が発生した事例もあります。
            </p>
          </div>

          <h3 class="section-subtitle">この章の構成</h3>
          <ul class="feature-list">
            <li><strong>2.1 IAMとは</strong> - IAMの基本概念と構成要素を学びます</li>
            <li><strong>2.2 IAMユーザーによるサインイン</strong> - 安全なサインイン方法を理解します</li>
            <li><strong>理解度テスト</strong> - 学んだ内容を確認します</li>
          </ul>
        </div>
      `
    },
    // セクション2: IAMとは
    {
      id: "2-1",
      title: "IAMとは",
      type: "explanation",
      content: `
        <div class="chapter-container">
          <h2 class="section-title">&#128274; 2.1 IAMとは</h2>

          <p class="text-paragraph">
            <span class="highlight">IAM（Identity and Access Management）</span>は、
            AWSリソースへのアクセスを安全に管理するためのサービスです。
            「<strong>誰が</strong>」「<strong>何を</strong>」「<strong>できるか</strong>」を細かく制御できます。
          </p>

          <h3 class="section-subtitle">ルートユーザーとIAMユーザー</h3>

          <p class="text-paragraph">
            AWSには2種類のユーザーがあります。それぞれの違いを理解しましょう。
          </p>

          <div class="comparison-container">
            <div class="bad-example">
              <div class="example-header">
                <span class="example-badge">非推奨</span>
                <span class="example-title">ルートユーザー</span>
              </div>
              <ul class="feature-list">
                <li>アカウント作成時のユーザー</li>
                <li><strong>すべての権限</strong>を持つ</li>
                <li>IAMポリシーで権限の制限ができない</li>
                <li>日常的な使用は<strong>厳禁</strong></li>
              </ul>
            </div>
            <div class="good-example">
              <div class="example-header">
                <span class="example-badge">推奨</span>
                <span class="example-title">IAMユーザー</span>
              </div>
              <ul class="feature-list">
                <li>IAMで作成するユーザー</li>
                <li><strong>必要な権限のみ</strong>付与</li>
                <li>権限を細かく制御可能</li>
                <li>日常的な作業に使用</li>
              </ul>
            </div>
          </div>

          <div class="point-box">
            <div class="point-box-title">&#128161; 最小権限の原則</div>
            <p>
              セキュリティのベストプラクティスとして、<strong>必要最小限の権限のみを付与する</strong>
              という原則があります。これを「最小権限の原則」と呼びます。
            </p>
          </div>

          <!-- IAMユーザー スライドショー -->
          <div class="inline-slideshow" id="user-slideshow">
            <div class="inline-slideshow-header">
              <h3 class="inline-slideshow-title">&#128196; IAMユーザー管理 図解</h3>
            </div>
            <div class="inline-slideshow-body">
              <div class="inline-slide-area">
                <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="user" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                <div class="inline-slide-image-wrapper">
                  <img class="inline-slide-image" id="user-slide-img" src="images/02/user01.png" alt="IAMユーザー 1 / 6">
                </div>
                <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="user" data-dir="next" aria-label="次のスライド">&#10095;</button>
              </div>
              <div class="inline-slide-counter-area">
                <span class="inline-slide-counter" id="user-counter">1 / 6</span>
              </div>
              <div class="inline-slide-indicators" id="user-indicators"></div>
            </div>
          </div>

          <script>
            initInlineSlideshow('user', {
              folder: 'images/02',
              prefix: 'user',
              pageCount: 6,
              imgId: 'user-slide-img',
              counterId: 'user-counter',
              indicatorsId: 'user-indicators'
            });
          </script>

          <h3 class="section-subtitle">IAMの主要な構成要素</h3>

          <p class="text-paragraph">
            IAMは以下の4つの主要な要素で構成されています。
          </p>

          <div class="card">
            <h4 class="card-title"><span class="icon">&#128100;</span><span class="aws-keyword" data-service="IAMユーザー">IAMユーザー</span></h4>
            <p class="text-paragraph">
              AWSを利用する<strong>個人またはアプリケーション</strong>を表します。
              各ユーザーには固有の認証情報（パスワード、アクセスキー）が付与されます。
            </p>
          </div>

          <div class="card">
            <h4 class="card-title"><span class="icon">&#128101;</span>IAMグループ</h4>
            <p class="text-paragraph">
              IAMユーザーの<strong>集まり</strong>です。
              グループに権限を付与すると、所属するすべてのユーザーにその権限が適用されます。
            </p>
          </div>

          <div class="card">
            <h4 class="card-title"><span class="icon">&#128220;</span><span class="aws-keyword" data-service="IAMポリシー">IAMポリシー</span></h4>
            <p class="text-paragraph">
              <strong>権限を定義したドキュメント</strong>です。JSON形式で記述され、
              「どのリソースに」「どのアクションを」「許可/拒否するか」を定義します。
            </p>
            <div class="code-block" data-filename="ポリシーの例（S3読み取り専用）">
<button class="copy-btn" onclick="copyCode(this)">コピー</button>
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:ListBucket"
      ],
      "Resource": "*"
    }
  ]
}</div>
          </div>

          <div class="card">
            <h4 class="card-title"><span class="icon">&#127917;</span><span class="aws-keyword" data-service="IAMロール">IAMロール</span></h4>
            <p class="text-paragraph">
              <strong>一時的に権限を付与</strong>するための仕組みです。
              <span class="aws-keyword" data-service="EC2">EC2</span>インスタンスや<span class="aws-keyword" data-service="Lambda">Lambda</span>関数など、AWSサービスに権限を付与する際に使用します。
            </p>
            <div class="info-box">
              <div class="info-box-title">&#128161; ユーザーとロールの違い</div>
              <p>
                ユーザーは長期的な認証情報（パスワード、アクセスキー）を持ちます。
                ロールは一時的な認証情報を提供し、AWSサービスやアプリケーションに権限を付与する際に使用します。
              </p>
            </div>
          </div>

          <!-- IAM構成要素 スライドショー -->
          <div class="inline-slideshow" id="iam-slideshow">
            <div class="inline-slideshow-header">
              <h3 class="inline-slideshow-title">&#128196; IAMの構成要素 図解</h3>
            </div>
            <div class="inline-slideshow-body">
              <div class="inline-slide-area">
                <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="iam" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                <div class="inline-slide-image-wrapper">
                  <img class="inline-slide-image" id="iam-slide-img" src="images/02/iam01.png" alt="IAM構成要素 1 / 4">
                </div>
                <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="iam" data-dir="next" aria-label="次のスライド">&#10095;</button>
              </div>
              <div class="inline-slide-counter-area">
                <span class="inline-slide-counter" id="iam-counter">1 / 4</span>
              </div>
              <div class="inline-slide-indicators" id="iam-indicators"></div>
            </div>
          </div>

          <script>
            initInlineSlideshow('iam', {
              folder: 'images/02',
              prefix: 'iam',
              pageCount: 4,
              imgId: 'iam-slide-img',
              counterId: 'iam-counter',
              indicatorsId: 'iam-indicators'
            });
          </script>

          <div class="summary-box">
            <h3 class="summary-title">&#128203; IAMの構成要素まとめ</h3>
            <ul class="summary-list">
              <li><strong>ユーザー</strong>：AWSを利用する個人やアプリケーション</li>
              <li><strong>グループ</strong>：ユーザーの集まり、権限を一括管理</li>
              <li><strong>ポリシー</strong>：権限を定義したJSON文書</li>
              <li><strong>ロール</strong>：サービスに一時的に権限を付与</li>
            </ul>
          </div>
        </div>
      `
    },
    // ハンズオン1: IAMグループとIAMユーザーの作成
    {
      id: "2-handson1",
      title: "デモ：IAMグループとIAMユーザーの作成",
      type: "explanation",
      content: `
        <div class="chapter-container">
          <h2 class="section-title">&#128736; デモ：IAMグループとIAMユーザーの作成</h2>
          
          <div class="point-box">
            <ul class="feature-list">
              <li><strong>操作場所：</strong> AWSマネジメントコンソール</li>
              <li><strong>ゴール：</strong> IAMグループを作成して適切なポリシーを設定し、そこに新規作成したIAMユーザーを追加して権限を管理する。</li>
            </ul>
          </div>

          <h3 class="section-subtitle">IAMグループの作成</h3>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">1</span>
              <span class="step-title">コンソールへのログイン</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph">ルートユーザーまたは管理者権限を持つユーザーでAWSマネジメントコンソールにログインします。</p>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">2</span>
              <span class="step-title">IAMサービスを開く</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph">コンソール上部の検索窓に「IAM」と入力し、サービス一覧から「IAM」を選択してダッシュボードを開きます。</p>
              
              <!-- IAMグループ作成手順2 スライドショー -->
              <div class="inline-slideshow" id="create-group2-slideshow">
                <div class="inline-slideshow-header">
                  <h3 class="inline-slideshow-title">&#128196; 画面例</h3>
                </div>
                <div class="inline-slideshow-body">
                  <div class="inline-slide-area">
                    <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="create-group2" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                    <div class="inline-slide-image-wrapper">
                      <img class="inline-slide-image" id="create-group2-slide-img" src="images/02/handson/create-group201.png" alt="IAMユーザー 1 / 2">
                    </div>
                    <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="create-group2" data-dir="next" aria-label="次のスライド">&#10095;</button>
                  </div>
                  <div class="inline-slide-counter-area">
                    <span class="inline-slide-counter" id="create-group2-counter">1 / 2</span>
                  </div>
                  <div class="inline-slide-indicators" id="create-group2-indicators"></div>
                </div>
              </div>

              <script>
                initInlineSlideshow('create-group2', {
                  folder: 'images/02/handson',
                  prefix: 'create-group2',
                  pageCount: 2,
                  imgId: 'create-group2-slide-img',
                  counterId: 'create-group2-counter',
                  indicatorsId: 'create-group2-indicators'
                });
              </script>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">3</span>
              <span class="step-title">ユーザーグループの作成開始</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph">左側のメニューから「ユーザーグループ」を選択し、「グループを作成」をクリックします。</p>
              
              <!-- IAMグループ作成手順3 スライドショー -->
              <div class="inline-slideshow" id="create-group3-slideshow">
                <div class="inline-slideshow-header">
                  <h3 class="inline-slideshow-title">&#128196; 画面例</h3>
                </div>
                <div class="inline-slideshow-body">
                  <div class="inline-slide-area">
                    <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="create-group3" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                    <div class="inline-slide-image-wrapper">
                      <img class="inline-slide-image" id="create-group3-slide-img" src="images/02/handson/create-group301.png" alt="IAMユーザー 1 / 2">
                    </div>
                    <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="create-group3" data-dir="next" aria-label="次のスライド">&#10095;</button>
                  </div>
                  <div class="inline-slide-counter-area">
                    <span class="inline-slide-counter" id="create-group3-counter">1 / 2</span>
                  </div>
                  <div class="inline-slide-indicators" id="create-group3-indicators"></div>
                </div>
              </div>

              <script>
                initInlineSlideshow('create-group3', {
                  folder: 'images/02/handson',
                  prefix: 'create-group3',
                  pageCount: 2,
                  imgId: 'create-group3-slide-img',
                  counterId: 'create-group3-counter',
                  indicatorsId: 'create-group3-indicators'
                });
              </script>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">4</span>
              <span class="step-title">グループ名の入力</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph">グループ名（例: <code>Developers</code>）を入力します。</p>

              <!-- IAMグループ作成手順4 スライドショー -->
              <div class="inline-slideshow" id="create-group4-slideshow">
                <div class="inline-slideshow-header">
                  <h3 class="inline-slideshow-title">&#128196; 画面例</h3>
                </div>
                <div class="inline-slideshow-body">
                  <div class="inline-slide-area">
                    <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="create-group4" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                    <div class="inline-slide-image-wrapper">
                      <img class="inline-slide-image" id="create-group4-slide-img" src="images/02/handson/create-group401.png" alt="IAMユーザー 1 / 2">
                    </div>
                    <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="create-group4" data-dir="next" aria-label="次のスライド">&#10095;</button>
                  </div>
                  <div class="inline-slide-counter-area">
                    <span class="inline-slide-counter" id="create-group4-counter">1 / 2</span>
                  </div>
                  <div class="inline-slide-indicators" id="create-group4-indicators"></div>
                </div>
              </div>

              <script>
                initInlineSlideshow('create-group4', {
                  folder: 'images/02/handson',
                  prefix: 'create-group4',
                  pageCount: 2,
                  imgId: 'create-group4-slide-img',
                  counterId: 'create-group4-counter',
                  indicatorsId: 'create-group4-indicators'
                });
              </script>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">5</span>
              <span class="step-title">グループの作成</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph">画面下部の「グループを作成」をクリックします。</p>
              <p class="text-paragraph"><small>※現時点ではポリシー（権限）は設定しません。次の工程で作成するカスタムポリシーを後ほどアタッチします。</small></p>

              <!-- IAMグループ作成手順5 スライドショー -->
              <div class="inline-slideshow" id="create-group5-slideshow">
                <div class="inline-slideshow-header">
                  <h3 class="inline-slideshow-title">&#128196; 画面例</h3>
                </div>
                <div class="inline-slideshow-body">
                  <div class="inline-slide-area">
                    <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="create-group5" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                    <div class="inline-slide-image-wrapper">
                      <img class="inline-slide-image" id="create-group5-slide-img" src="images/02/handson/create-group501.png" alt="IAMユーザー 1 / 2">
                    </div>
                    <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="create-group5" data-dir="next" aria-label="次のスライド">&#10095;</button>
                  </div>
                  <div class="inline-slide-counter-area">
                    <span class="inline-slide-counter" id="create-group5-counter">1 / 2</span>
                  </div>
                  <div class="inline-slide-indicators" id="create-group5-indicators"></div>
                </div>
              </div>

              <script>
                initInlineSlideshow('create-group5', {
                  folder: 'images/02/handson',
                  prefix: 'create-group5',
                  pageCount: 2,
                  imgId: 'create-group5-slide-img',
                  counterId: 'create-group5-counter',
                  indicatorsId: 'create-group5-indicators'
                });
              </script>
            </div>
          </div>

          <h3 class="section-subtitle">カスタムポリシーの作成</h3>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">1</span>
              <span class="step-title">ポリシー作成画面を開く</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph">左側のメニューから「ポリシー」を選択し、「ポリシーの作成」をクリックして作成画面を開きます。</p>

              <!-- カスタムポリシー作成手順1 スライドショー -->
              <div class="inline-slideshow" id="create-policy1-slideshow">
                <div class="inline-slideshow-header">
                  <h3 class="inline-slideshow-title">&#128196; 画面例</h3>
                </div>
                <div class="inline-slideshow-body">
                  <div class="inline-slide-area">
                    <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="create-policy1" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                    <div class="inline-slide-image-wrapper">
                      <img class="inline-slide-image" id="create-policy1-slide-img" src="images/02/handson/create-policy101.png" alt="IAMユーザー 1 / 2">
                    </div>
                    <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="create-policy1" data-dir="next" aria-label="次のスライド">&#10095;</button>
                  </div>
                  <div class="inline-slide-counter-area">
                    <span class="inline-slide-counter" id="create-policy1-counter">1 / 2</span>
                  </div>
                  <div class="inline-slide-indicators" id="create-policy1-indicators"></div>
                </div>
              </div>

              <script>
                initInlineSlideshow('create-policy1', {
                  folder: 'images/02/handson',
                  prefix: 'create-policy1',
                  pageCount: 2,
                  imgId: 'create-policy1-slide-img',
                  counterId: 'create-policy1-counter',
                  indicatorsId: 'create-policy1-indicators'
                });
              </script>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">2</span>
              <span class="step-title">アクセス許可を指定</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph">「JSON」タブを選択し、以下のコードを貼り付けます。貼り付け後、画面下部の「次へ」をクリックします。</p>
              <div class="code-block"><button class="copy-btn" onclick="copyCode(this)">コピー</button>
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "ec2:*",
                "s3:*",
                "ecr:*"
            ],
            "Resource": "*"
        }
    ]
}</div>

              <!-- カスタムポリシー作成手順2 スライドショー -->
              <div class="inline-slideshow" id="create-policy2-slideshow">
                <div class="inline-slideshow-header">
                  <h3 class="inline-slideshow-title">&#128196; 画面例</h3>
                </div>
                <div class="inline-slideshow-body">
                  <div class="inline-slide-area">
                    <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="create-policy2" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                    <div class="inline-slide-image-wrapper">
                      <img class="inline-slide-image" id="create-policy2-slide-img" src="images/02/handson/create-policy201.png" alt="IAMユーザー 1 / 2">
                    </div>
                    <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="create-policy2" data-dir="next" aria-label="次のスライド">&#10095;</button>
                  </div>
                  <div class="inline-slide-counter-area">
                    <span class="inline-slide-counter" id="create-policy2-counter">1 / 3</span>
                  </div>
                  <div class="inline-slide-indicators" id="create-policy2-indicators"></div>
                </div>
              </div>

              <script>
                initInlineSlideshow('create-policy2', {
                  folder: 'images/02/handson',
                  prefix: 'create-policy2',
                  pageCount: 3,
                  imgId: 'create-policy2-slide-img',
                  counterId: 'create-policy2-counter',
                  indicatorsId: 'create-policy2-indicators'
                });
              </script>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">3</span>
              <span class="step-title">確認して作成</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph">ポリシー名（例: <code>CustomHandsOnPolicy</code>）を入力し、画面下部の「ポリシーの作成」をクリックします。</p>

              <!-- カスタムポリシー作成手順3 スライドショー -->
              <div class="inline-slideshow" id="create-policy3-slideshow">
                <div class="inline-slideshow-header">
                  <h3 class="inline-slideshow-title">&#128196; 画面例</h3>
                </div>
                <div class="inline-slideshow-body">
                  <div class="inline-slide-area">
                    <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="create-policy3" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                    <div class="inline-slide-image-wrapper">
                      <img class="inline-slide-image" id="create-policy3-slide-img" src="images/02/handson/create-policy301.png" alt="IAMユーザー 1 / 2">
                    </div>
                    <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="create-policy3" data-dir="next" aria-label="次のスライド">&#10095;</button>
                  </div>
                  <div class="inline-slide-counter-area">
                    <span class="inline-slide-counter" id="create-policy3-counter">1 / 3</span>
                  </div>
                  <div class="inline-slide-indicators" id="create-policy3-indicators"></div>
                </div>
              </div>

              <script>
                initInlineSlideshow('create-policy3', {
                  folder: 'images/02/handson',
                  prefix: 'create-policy3',
                  pageCount: 3,
                  imgId: 'create-policy3-slide-img',
                  counterId: 'create-policy3-counter',
                  indicatorsId: 'create-policy3-indicators'
                });
              </script>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">4</span>
              <span class="step-title">グループの選択</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph">左メニューの「ユーザーグループ」から作成したグループ（<code>Developers</code>）を選択し、「許可」タブ → 「許可を追加」 → 「ポリシーをアタッチ」をクリックします。</p>

              <!-- カスタムポリシー作成手順4 スライドショー -->
              <div class="inline-slideshow" id="create-policy4-slideshow">
                <div class="inline-slideshow-header">
                  <h3 class="inline-slideshow-title">&#128196; 画面例</h3>
                </div>
                <div class="inline-slideshow-body">
                  <div class="inline-slide-area">
                    <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="create-policy4" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                    <div class="inline-slide-image-wrapper">
                      <img class="inline-slide-image" id="create-policy4-slide-img" src="images/02/handson/create-policy401.png" alt="IAMユーザー 1 / 2">
                    </div>
                    <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="create-policy4" data-dir="next" aria-label="次のスライド">&#10095;</button>
                  </div>
                  <div class="inline-slide-counter-area">
                    <span class="inline-slide-counter" id="create-policy4-counter">1 / 3</span>
                  </div>
                  <div class="inline-slide-indicators" id="create-policy4-indicators"></div>
                </div>
              </div>

              <script>
                initInlineSlideshow('create-policy4', {
                  folder: 'images/02/handson',
                  prefix: 'create-policy4',
                  pageCount: 3,
                  imgId: 'create-policy4-slide-img',
                  counterId: 'create-policy4-counter',
                  indicatorsId: 'create-policy4-indicators'
                });
              </script>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">5</span>
              <span class="step-title">ポリシーのアタッチ</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph">作成した <code>CustomHandsOnPolicy</code> を検索して選択し、画面右下の「ポリシーをアタッチ」ボタンをクリックして追加します。</p>

              <!-- カスタムポリシー作成手順5 スライドショー -->
              <div class="inline-slideshow" id="create-policy5-slideshow">
                <div class="inline-slideshow-header">
                  <h3 class="inline-slideshow-title">&#128196; 画面例</h3>
                </div>
                <div class="inline-slideshow-body">
                  <div class="inline-slide-area">
                    <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="create-policy5" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                    <div class="inline-slide-image-wrapper">
                      <img class="inline-slide-image" id="create-policy5-slide-img" src="images/02/handson/create-policy501.png" alt="IAMユーザー 1 / 2">
                    </div>
                    <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="create-policy5" data-dir="next" aria-label="次のスライド">&#10095;</button>
                  </div>
                  <div class="inline-slide-counter-area">
                    <span class="inline-slide-counter" id="create-policy5-counter">1 / 3</span>
                  </div>
                  <div class="inline-slide-indicators" id="create-policy5-indicators"></div>
                </div>
              </div>

              <script>
                initInlineSlideshow('create-policy5', {
                  folder: 'images/02/handson',
                  prefix: 'create-policy5',
                  pageCount: 3,
                  imgId: 'create-policy5-slide-img',
                  counterId: 'create-policy5-counter',
                  indicatorsId: 'create-policy5-indicators'
                });
              </script>
            </div>
          </div>

          <h3 class="section-subtitle">IAMユーザーの作成</h3>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">1</span>
              <span class="step-title">IAMユーザーの作成開始</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph">左側のメニューから「ユーザー」を選択し、「ユーザーの作成」をクリックします。</p>

              <!-- IAMユーザー作成手順1 スライドショー -->
              <div class="inline-slideshow" id="create-user1-slideshow">
                <div class="inline-slideshow-header">
                  <h3 class="inline-slideshow-title">&#128196; 画面例</h3>
                </div>
                <div class="inline-slideshow-body">
                  <div class="inline-slide-area">
                    <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="create-user1" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                    <div class="inline-slide-image-wrapper">
                      <img class="inline-slide-image" id="create-user1-slide-img" src="images/02/handson/create-user101.png" alt="IAMユーザー 1 / 1">
                    </div>
                    <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="create-user1" data-dir="next" aria-label="次のスライド">&#10095;</button>
                  </div>
                  <div class="inline-slide-counter-area">
                    <span class="inline-slide-counter" id="create-user1-counter">1 / 1</span>
                  </div>
                  <div class="inline-slide-indicators" id="create-user1-indicators"></div>
                </div>
              </div>

              <script>
                initInlineSlideshow('create-user1', {
                  folder: 'images/02/handson',
                  prefix: 'create-user1',
                  pageCount: 1,
                  imgId: 'create-user1-slide-img',
                  counterId: 'create-user1-counter',
                  indicatorsId: 'create-user1-indicators'
                });
              </script>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">2</span>
              <span class="step-title">ユーザー詳細の設定</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph">ユーザー名（例: <code>aws-user</code>）を入力し、「AWS マネジメントコンソールへのユーザーアクセスを提供する」にチェックを入れ、カスタムパスワード（例: <code>AWS-password-1234</code>）を設定した後、画面右下の「次へ」をクリックします。</p>

              <!-- IAMユーザー作成手順2 スライドショー -->
              <div class="inline-slideshow" id="create-user2-slideshow">
                <div class="inline-slideshow-header">
                  <h3 class="inline-slideshow-title">&#128196; 画面例</h3>
                </div>
                <div class="inline-slideshow-body">
                  <div class="inline-slide-area">
                    <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="create-user2" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                    <div class="inline-slide-image-wrapper">
                      <img class="inline-slide-image" id="create-user2-slide-img" src="images/02/handson/create-user201.png" alt="IAMユーザー 1 / 2">
                    </div>
                    <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="create-user2" data-dir="next" aria-label="次のスライド">&#10095;</button>
                  </div>
                  <div class="inline-slide-counter-area">
                    <span class="inline-slide-counter" id="create-user2-counter">1 / 2</span>
                  </div>
                  <div class="inline-slide-indicators" id="create-user2-indicators"></div>
                </div>
              </div>

              <script>
                initInlineSlideshow('create-user2', {
                  folder: 'images/02/handson',
                  prefix: 'create-user2',
                  pageCount: 2,
                  imgId: 'create-user2-slide-img',
                  counterId: 'create-user2-counter',
                  indicatorsId: 'create-user2-indicators'
                });
              </script>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">3</span>
              <span class="step-title">グループへの追加</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph">「許可のオプション」で「ユーザーをグループに追加」を選択し、先ほど作成したグループ（例: <code>Developers</code>）にチェックを入れてから、画面右下の「次へ」をクリックします。</p>

              <!-- IAMユーザー作成手順3 スライドショー -->
              <div class="inline-slideshow" id="create-user3-slideshow">
                <div class="inline-slideshow-header">
                  <h3 class="inline-slideshow-title">&#128196; 画面例</h3>
                </div>
                <div class="inline-slideshow-body">
                  <div class="inline-slide-area">
                    <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="create-user3" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                    <div class="inline-slide-image-wrapper">
                      <img class="inline-slide-image" id="create-user3-slide-img" src="images/02/handson/create-user301.png" alt="IAMユーザー 1 / 1">
                    </div>
                    <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="create-user3" data-dir="next" aria-label="次のスライド">&#10095;</button>
                  </div>
                  <div class="inline-slide-counter-area">
                    <span class="inline-slide-counter" id="create-user3-counter">1 / 1</span>
                  </div>
                  <div class="inline-slide-indicators" id="create-user3-indicators"></div>
                </div>
              </div>

              <script>
                initInlineSlideshow('create-user3', {
                  folder: 'images/02/handson',
                  prefix: 'create-user3',
                  pageCount: 1,
                  imgId: 'create-user3-slide-img',
                  counterId: 'create-user3-counter',
                  indicatorsId: 'create-user3-indicators'
                });
              </script>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">4</span>
              <span class="step-title">内容の確認と作成</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph">これまでの設定内容を確認し、画面右下の「ユーザーの作成」をクリックします。</p>

              <!-- IAMユーザー作成手順4 スライドショー -->
              <div class="inline-slideshow" id="create-user4-slideshow">
                <div class="inline-slideshow-header">
                  <h3 class="inline-slideshow-title">&#128196; 画面例</h3>
                </div>
                <div class="inline-slideshow-body">
                  <div class="inline-slide-area">
                    <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="create-user4" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                    <div class="inline-slide-image-wrapper">
                      <img class="inline-slide-image" id="create-user4-slide-img" src="images/02/handson/create-user401.png" alt="IAMユーザー 1 / 1">
                    </div>
                    <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="create-user4" data-dir="next" aria-label="次のスライド">&#10095;</button>
                  </div>
                  <div class="inline-slide-counter-area">
                    <span class="inline-slide-counter" id="create-user4-counter">1 / 1</span>
                  </div>
                  <div class="inline-slide-indicators" id="create-user4-indicators"></div>
                </div>
              </div>

              <script>
                initInlineSlideshow('create-user4', {
                  folder: 'images/02/handson',
                  prefix: 'create-user4',
                  pageCount: 1,
                  imgId: 'create-user4-slide-img',
                  counterId: 'create-user4-counter',
                  indicatorsId: 'create-user4-indicators'
                });
              </script>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">5</span>
              <span class="step-title">パスワードの取得</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph">コンソールサインインURLやパスワードなどのログイン情報を確認し、CSVファイルをダウンロードするか、安全な場所に必ず控えておきます。</p>

              <!-- IAMユーザー作成手順5 スライドショー -->
              <div class="inline-slideshow" id="create-user5-slideshow">
                <div class="inline-slideshow-header">
                  <h3 class="inline-slideshow-title">&#128196; 画面例</h3>
                </div>
                <div class="inline-slideshow-body">
                  <div class="inline-slide-area">
                    <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="create-user5" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                    <div class="inline-slide-image-wrapper">
                      <img class="inline-slide-image" id="create-user5-slide-img" src="images/02/handson/create-user501.png" alt="IAMユーザー 1 / 1">
                    </div>
                    <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="create-user5" data-dir="next" aria-label="次のスライド">&#10095;</button>
                  </div>
                  <div class="inline-slide-counter-area">
                    <span class="inline-slide-counter" id="create-user5-counter">1 / 1</span>
                  </div>
                  <div class="inline-slide-indicators" id="create-user5-indicators"></div>
                </div>
              </div>

              <script>
                initInlineSlideshow('create-user5', {
                  folder: 'images/02/handson',
                  prefix: 'create-user5',
                  pageCount: 1,
                  imgId: 'create-user5-slide-img',
                  counterId: 'create-user5-counter',
                  indicatorsId: 'create-user5-indicators'
                });
              </script>
            </div>
          </div>
        </div>
      `
    },
    // セクション3: IAMユーザーによるサインイン
    {
      id: "2-2",
      title: "IAMユーザーによるサインイン",
      type: "explanation",
      content: `
        <div class="chapter-container">
          <h2 class="section-title">&#128272; 2.2 IAMユーザーによるサインイン</h2>

          <p class="text-paragraph">
            IAMユーザーを作成したら、そのユーザーでAWSマネジメントコンソールにサインインできます。
            ルートユーザーとは異なる方法でサインインします。
          </p>

          <h3 class="section-subtitle">サインイン方法の違い</h3>

          <div class="comparison-container">
            <div class="bad-example">
              <div class="example-header">
                <span class="example-badge">ルートユーザー</span>
              </div>
              <p class="text-paragraph">
                <strong>サインインURL：</strong><br>
                <code>https://console.aws.amazon.com/</code>
              </p>
              <p class="text-paragraph">
                <strong>認証情報：</strong><br>
                メールアドレス + パスワード
              </p>
            </div>
            <div class="good-example">
              <div class="example-header">
                <span class="example-badge">IAMユーザー</span>
              </div>
              <p class="text-paragraph">
                <strong>サインインURL：</strong><br>
                <code>https://[アカウントID].signin.aws.amazon.com/console</code>
              </p>
              <p class="text-paragraph">
                <strong>認証情報：</strong><br>
                ユーザー名 + パスワード
              </p>
            </div>
          </div>

          <h3 class="section-subtitle">IAMユーザーの認証方式</h3>

          <p class="text-paragraph">
            IAMユーザーには2種類の認証情報があります。
          </p>

          <div class="card">
            <h4 class="card-title"><span class="icon">&#128272;</span>コンソールパスワード</h4>
            <p class="text-paragraph">
              AWSマネジメントコンソール（Webブラウザ）にサインインするためのパスワードです。
              <strong>人間が手動で操作する場合</strong>に使用します。
            </p>
          </div>

          <div class="card">
            <h4 class="card-title"><span class="icon">&#128273;</span>アクセスキー</h4>
            <p class="text-paragraph">
              AWS CLIやSDKからAWSにアクセスするための認証情報です。
              <strong>アクセスキーID</strong>と<strong>シークレットアクセスキー</strong>のペアで構成されます。
            </p>
            <div class="warning-box">
              <div class="warning-box-title">&#9888; アクセスキーの取り扱い注意</div>
              <p>
                シークレットアクセスキーは<strong>作成時に一度だけ表示</strong>されます。
                <strong>絶対に公開しないでください</strong>。
                GitHubなどに誤ってコミットすると、数分で不正利用される危険があります。
              </p>
            </div>
          </div>

          <h3 class="section-subtitle">MFA（多要素認証）</h3>

          <p class="text-paragraph">
            <span class="aws-keyword" data-service="MFA">MFA</span>（Multi-Factor Authentication）を設定すると、
            パスワードに加えて<strong>別の認証要素</strong>が必要になり、セキュリティが大幅に向上します。
          </p>

          <div class="warning-box">
            <div class="warning-box-title">&#9888; ルートユーザーには必ずMFAを設定</div>
            <p>
              ルートユーザーには<strong>必ずMFAを設定してください</strong>。
              これはAWSのセキュリティベストプラクティスの中でも最も重要な項目の一つです。
            </p>
          </div>

          <!-- MFA 画像 -->
          <div style="margin: var(--space-xl) 0; text-align: center;">
            <img src="images/02/mfa.png" alt="MFA（多要素認証）" style="max-width: 100%; border-radius: var(--radius-lg); box-shadow: var(--shadow-md);">
          </div>
        </div>
      `
    },
    // ハンズオン2: IAMユーザーのサインイン
    {
      id: "2-handson2",
      title: "ハンズオン：IAMユーザーのサインイン",
      type: "explanation",
      content: `
        <div class="chapter-container">
          <h2 class="section-title">&#128736; ハンズオン：IAMユーザーのサインイン</h2>

          <div class="point-box">
            <ul class="feature-list">
              <li><strong>操作場所：</strong> ローカル（Macのブラウザ等）</li>
              <li><strong>ゴール：</strong> URL等必要な情報を配布し、作成したIAMユーザーでサインインする。</li>
            </ul>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">1</span>
              <span class="step-title">準備</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph">手元に「コンソールのサインインURL」「ユーザー名」「パスワード」が準備されていることを確認します。</p>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">2</span>
              <span class="step-title">サインインURLを開く</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph">ハンズオン1で作成した「コンソールのサインインURL」をブラウザで開きます。</p>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">3</span>
              <span class="step-title">アカウントIDの確認</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph">アカウントID（またはエイリアス）が入力されていることを確認します。</p>
              
              <!-- IAMユーザーサインイン手順3 スライドショー -->
              <div class="inline-slideshow" id="user-signin3-slideshow">
                <div class="inline-slideshow-header">
                  <h3 class="inline-slideshow-title">&#128196; 画面例</h3>
                </div>
                <div class="inline-slideshow-body">
                  <div class="inline-slide-area">
                    <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="user-signin3" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                    <div class="inline-slide-image-wrapper">
                      <img class="inline-slide-image" id="user-signin3-slide-img" src="images/02/handson/user-signin301.png" alt="IAMユーザーサインイン 1 / 1">
                    </div>
                    <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="user-signin3" data-dir="next" aria-label="次のスライド">&#10095;</button>
                  </div>
                  <div class="inline-slide-counter-area">
                    <span class="inline-slide-counter" id="user-signin3-counter">1 / 1</span>
                  </div>
                  <div class="inline-slide-indicators" id="user-signin3-indicators"></div>
                </div>
              </div>

              <script>
                initInlineSlideshow('user-signin3', {
                  folder: 'images/02/handson',
                  prefix: 'user-signin3',
                  pageCount: 1,
                  imgId: 'user-signin3-slide-img',
                  counterId: 'user-signin3-counter',
                  indicatorsId: 'user-signin3-indicators'
                });
              </script>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">4</span>
              <span class="step-title">情報の入力</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph">準備した「ユーザー名」と「パスワード」を入力してサインインします。</p>
              
              <!-- IAMユーザーサインイン手順4 スライドショー -->
              <div class="inline-slideshow" id="user-signin4-slideshow">
                <div class="inline-slideshow-header">
                  <h3 class="inline-slideshow-title">&#128196; 画面例</h3>
                </div>
                <div class="inline-slideshow-body">
                  <div class="inline-slide-area">
                    <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="user-signin4" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                    <div class="inline-slide-image-wrapper">
                      <img class="inline-slide-image" id="user-signin4-slide-img" src="images/02/handson/user-signin401.png" alt="IAMユーザーサインイン 1 / 1">
                    </div>
                    <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="user-signin4" data-dir="next" aria-label="次のスライド">&#10095;</button>
                  </div>
                  <div class="inline-slide-counter-area">
                    <span class="inline-slide-counter" id="user-signin4-counter">1 / 1</span>
                  </div>
                  <div class="inline-slide-indicators" id="user-signin4-indicators"></div>
                </div>
              </div>

              <script>
                initInlineSlideshow('user-signin4', {
                  folder: 'images/02/handson',
                  prefix: 'user-signin4',
                  pageCount: 1,
                  imgId: 'user-signin4-slide-img',
                  counterId: 'user-signin4-counter',
                  indicatorsId: 'user-signin4-indicators'
                });
              </script>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">5</span>
              <span class="step-title">パスワードの変更</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph">（初回ログイン時）画面の指示に従い、初期パスワードから新しいパスワードに変更します。</p>
              
              <!-- IAMユーザーサインイン手順5 スライドショー -->
              <div class="inline-slideshow" id="user-signin5-slideshow">
                <div class="inline-slideshow-header">
                  <h3 class="inline-slideshow-title">&#128196; 画面例</h3>
                </div>
                <div class="inline-slideshow-body">
                  <div class="inline-slide-area">
                    <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="user-signin5" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                    <div class="inline-slide-image-wrapper">
                      <img class="inline-slide-image" id="user-signin5-slide-img" src="images/02/handson/user-signin501.png" alt="IAMユーザーサインイン 1 / 2">
                    </div>
                    <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="user-signin5" data-dir="next" aria-label="次のスライド">&#10095;</button>
                  </div>
                  <div class="inline-slide-counter-area">
                    <span class="inline-slide-counter" id="user-signin5-counter">1 / 2</span>
                  </div>
                  <div class="inline-slide-indicators" id="user-signin5-indicators"></div>
                </div>
              </div>

              <script>
                initInlineSlideshow('user-signin5', {
                  folder: 'images/02/handson',
                  prefix: 'user-signin5',
                  pageCount: 2,
                  imgId: 'user-signin5-slide-img',
                  counterId: 'user-signin5-counter',
                  indicatorsId: 'user-signin5-indicators'
                });
              </script>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">6</span>
              <span class="step-title">ダッシュボードの確認</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph">サインイン後、AWSマネジメントコンソールのダッシュボードが表示されることを確認します。画面右上の表示が、作成したIAMユーザー名になっていることを確認してください。</p>
              
              <!-- IAMユーザーサインイン手順6 スライドショー -->
              <div class="inline-slideshow" id="user-signin6-slideshow">
                <div class="inline-slideshow-header">
                  <h3 class="inline-slideshow-title">&#128196; 画面例</h3>
                </div>
                <div class="inline-slideshow-body">
                  <div class="inline-slide-area">
                    <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="user-signin6" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                    <div class="inline-slide-image-wrapper">
                      <img class="inline-slide-image" id="user-signin6-slide-img" src="images/02/handson/user-signin601.png" alt="IAMユーザーサインイン 1 / 1">
                    </div>
                    <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="user-signin6" data-dir="next" aria-label="次のスライド">&#10095;</button>
                  </div>
                  <div class="inline-slide-counter-area">
                    <span class="inline-slide-counter" id="user-signin6-counter">1 / 1</span>
                  </div>
                  <div class="inline-slide-indicators" id="user-signin6-indicators"></div>
                </div>
              </div>

              <script>
                initInlineSlideshow('user-signin6', {
                  folder: 'images/02/handson',
                  prefix: 'user-signin6',
                  pageCount: 1,
                  imgId: 'user-signin6-slide-img',
                  counterId: 'user-signin6-counter',
                  indicatorsId: 'user-signin6-indicators'
                });
              </script>
            </div>
          </div>

          <div class="summary-box">
            <h3 class="summary-title">&#127881; 第2章 完了！</h3>
            <p class="text-paragraph">
              お疲れさまでした！この章では、IAMの基本を学びました。
            </p>
            <ul class="summary-list">
              <li>IAMはAWSのアクセス管理サービス</li>
              <li>ルートユーザーは日常使用せず、IAMユーザーを使用</li>
              <li>ユーザー、グループ、ポリシー、ロールの4つの要素</li>
              <li>MFAでセキュリティを強化</li>
              <li>最小権限の原則を守る</li>
            </ul>
            <p class="text-paragraph" style="margin-top: 20px;">
              次の章では、AWSのネットワーク基盤である<strong><span class="aws-keyword" data-service="VPC">VPC</span>（Virtual Private Cloud）</strong>を学びます。
            </p>
          </div>

          <div class="point-box" style="margin-top: 30px;">
            <div class="point-box-title">&#128214; AWS公式ドキュメント参照先</div>
            <ul class="feature-list">
              <li><a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html" target="_blank" rel="noopener">IAMとは（User Guide）</a></li>
              <li><a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users.html" target="_blank" rel="noopener">IAMユーザー</a> / <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/id_groups.html" target="_blank" rel="noopener">IAMグループ</a></li>
              <li><a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html" target="_blank" rel="noopener">IAMポリシーとアクセス許可</a></li>
              <li><a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html" target="_blank" rel="noopener">IAMロール</a></li>
              <li><a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/id_root-user.html" target="_blank" rel="noopener">ルートユーザー</a></li>
              <li><a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa.html" target="_blank" rel="noopener">MFA（多要素認証）</a></li>
              <li><a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html" target="_blank" rel="noopener">アクセスキーの管理</a></li>
              <li><a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html" target="_blank" rel="noopener">IAMセキュリティベストプラクティス</a></li>
            </ul>
          </div>
        </div>
      `
    },
    // セクション: 理解度テスト
    {
      id: "2-quiz",
      title: "第2章 理解度テスト",
      type: "quiz",
      questions: [
        {
          question: "日常的なAWS操作に使用すべきユーザーはどれですか？",
          options: [
            { label: "A", text: "ルートユーザー" },
            { label: "B", text: "匿名ユーザー" },
            { label: "C", text: "ゲストユーザー" },
            { label: "D", text: "IAMユーザー" }
          ],
          correct: 3,
          explanation: {
            correct: "正解です！ルートユーザーはすべての権限を持ち危険なため、日常的な作業にはIAMユーザーを使用することが推奨されています。",
            incorrect: "不正解です。ルートユーザーはすべての権限を持つため日常使用は厳禁です。日常的な作業にはIAMユーザーを使用してください。"
          }
        },
        {
          question: "「必要最小限の権限のみを付与する」というセキュリティの原則を何と呼びますか？",
          options: [
            { label: "A", text: "ゼロトラストの原則" },
            { label: "B", text: "多層防御の原則" },
            { label: "C", text: "最小権限の原則" },
            { label: "D", text: "権限分離の原則" }
          ],
          correct: 2,
          explanation: {
            correct: "正解です！最小権限の原則とは、ユーザーやサービスに必要最小限の権限のみを付与するセキュリティのベストプラクティスです。",
            incorrect: "不正解です。必要最小限の権限のみを付与する原則は「最小権限の原則」と呼ばれます。"
          }
        },
        {
          question: "IAMポリシーの説明として正しいものはどれですか？",
          options: [
            { label: "A", text: "AWSを利用する個人を表す" },
            { label: "B", text: "権限を定義したJSON形式のドキュメント" },
            { label: "C", text: "ユーザーの集まり" },
            { label: "D", text: "一時的な認証情報" }
          ],
          correct: 1,
          explanation: {
            correct: "正解です！IAMポリシーは権限を定義したJSON形式のドキュメントで、「どのリソースに」「どのアクションを」「許可/拒否するか」を定義します。",
            incorrect: "不正解です。IAMポリシーは権限を定義したJSON形式のドキュメントです。ユーザーはIAMユーザー、集まりはIAMグループ、一時的な認証情報はIAMロールに該当します。"
          }
        },
        {
          question: "EC2インスタンスやLambda関数などのAWSサービスに一時的に権限を付与するために使用するIAMの構成要素はどれですか？",
          options: [
            { label: "A", text: "IAMユーザー" },
            { label: "B", text: "IAMグループ" },
            { label: "C", text: "IAMポリシー" },
            { label: "D", text: "IAMロール" }
          ],
          correct: 3,
          explanation: {
            correct: "正解です！IAMロールはサービスやアプリケーションに一時的に権限を付与するための仕組みです。EC2やLambdaなどに権限を付与する際に使用します。",
            incorrect: "不正解です。AWSサービスに一時的に権限を付与するにはIAMロールを使用します。IAMユーザーは人に紐づく長期的な認証情報です。"
          }
        },
        {
          question: "ルートユーザーのセキュリティ対策として最も重要なものはどれですか？",
          options: [
            { label: "A", text: "MFA（多要素認証）を設定する" },
            { label: "B", text: "パスワードを定期的に変更する" },
            { label: "C", text: "アクセスキーを作成する" },
            { label: "D", text: "複数人で共有して使用する" }
          ],
          correct: 0,
          explanation: {
            correct: "正解です！ルートユーザーには必ずMFA（多要素認証）を設定してください。これはAWSのセキュリティベストプラクティスの中でも最も重要な項目の一つです。",
            incorrect: "不正解です。ルートユーザーにはMFA（多要素認証）を設定することが最も重要です。また、ルートユーザーを複数人で共有することは絶対に避けてください。"
          }
        }
      ]
    }
  ]
};
