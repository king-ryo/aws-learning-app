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
