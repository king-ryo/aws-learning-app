// ========================================
// 第6章: S3（ストレージサービス）（短縮版）
// ========================================
const chapter06 = {
  id: 6,
  title: "S3（ストレージサービス）",
  sections: [
    // イントロダクション
    {
      id: "6-intro",
      title: "この章で学ぶこと",
      type: "explanation",
      content: `
        <div class="chapter-container">
          <div class="chapter-intro-banner">
            <div class="chapter-number">CHAPTER 06</div>
            <h1 class="chapter-main-title">S3（ストレージサービス）</h1>
            <p class="chapter-subtitle">あらゆるデータを安全に保存するオブジェクトストレージ</p>
          </div>

          <div class="learning-goals">
            <h3 class="learning-goals-title">&#127919; この章の学習目標</h3>
            <ul class="learning-goals-list">
              <li>オブジェクトストレージの概念を理解する</li>
              <li>バケットとオブジェクトの関係を理解する</li>
              <li>ストレージクラスを使い分けられるようになる</li>
              <li>S3のセキュリティ設定を理解する</li>
              <li>静的ウェブサイトホスティングを設定できる</li>
            </ul>
          </div>

          <h2 class="section-title">&#128218; はじめに</h2>

          <p class="text-paragraph">
            Amazon <span class="aws-keyword" data-service="s3">S3</span>（Simple Storage Service）は、AWSで最も利用されるストレージサービスです。
            画像、動画、バックアップデータなど、あらゆるファイルを安全に保存できます。
          </p>

          <div class="info-box">
            <div class="info-box-title">&#128161; S3の活用場面</div>
            <ul>
              <li><strong>静的コンテンツ配信</strong> - 画像・CSS・JavaScriptファイルの配信</li>
              <li><strong>バックアップ保存</strong> - データベースやログのバックアップ</li>
              <li><strong>データレイク</strong> - 大量データの蓄積・分析基盤</li>
              <li><strong>静的ウェブサイト</strong> - HTMLサイトのホスティング</li>
            </ul>
          </div>

          <div class="prereq-box">
            <h3>前提知識</h3>
            <ul>
              <li>第1章〜第3章の内容（AWS基礎、IAM、VPC）</li>
              <li>ファイルとフォルダの基本的な概念</li>
            </ul>
          </div>

          <h2 class="section-title">&#128506; この章の構成</h2>
          <div class="info-box">
            <ul>
              <li><strong>セクション1</strong>：S3とは - オブジェクトストレージの基本概念</li>
              <li><strong>セクション2</strong>：バケットとオブジェクト - S3の基本要素</li>
              <li><strong>セクション3</strong>：ストレージクラス - 用途に応じた保存方式</li>
              <li><strong>セクション4</strong>：S3のセキュリティ - アクセス制御と暗号化</li>
              <li><strong>セクション5</strong>：静的ウェブサイトホスティング - S3でWebサイト公開</li>
              <li><strong>理解度テスト</strong>：5問のクイズで理解度をチェック</li>
            </ul>
          </div>
        </div>
      `
    },

    // セクション1: S3とは
    {
      id: "6-1",
      title: "S3とは",
      type: "explanation",
      content: `
        <div class="chapter-container">
          <h2 class="section-title">S3とは</h2>

          <div class="term-box">
            <h3>Amazon S3（Simple Storage Service）とは</h3>
            <p><span class="aws-keyword" data-service="s3">S3</span>は、インターネット経由でアクセスできるオブジェクトストレージサービスです。容量無制限で、高い耐久性（99.999999999%＝イレブンナイン）を持ちます。</p>
          </div>

          <div class="info-box">
            <h3>オブジェクトストレージとは？</h3>
            <p>従来のファイルストレージ（フォルダ階層でファイルを管理）とは異なり、データを「オブジェクト」として管理する方式です。</p>
          </div>

          <div class="comparison-container">
            <h3>ストレージ方式の比較</h3>
            <div class="comparison-grid">
              <div class="comparison-item">
                <h4>ファイルストレージ</h4>
                <div class="comparison-content">
                  <ul>
                    <li>フォルダ階層でファイルを整理</li>
                    <li>パスでファイルを特定</li>
                    <li>従来のPC・サーバーと同じ方式</li>
                  </ul>
                </div>
              </div>
              <div class="comparison-item highlight">
                <h4>オブジェクトストレージ（S3）</h4>
                <div class="comparison-content">
                  <ul>
                    <li>フラットな構造（実際の階層なし）</li>
                    <li>キー（名前）でオブジェクトを特定</li>
                    <li>メタデータを自由に付加可能</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="point-box">
            <h3>S3の特徴</h3>
            <table class="info-table">
              <tr>
                <th>特徴</th>
                <th>説明</th>
              </tr>
              <tr>
                <td><strong>高い耐久性</strong></td>
                <td>99.999999999%（イレブンナイン）の耐久性。100億個のオブジェクトで10年に1個の損失確率</td>
              </tr>
              <tr>
                <td><strong>容量無制限</strong></td>
                <td>保存できるデータ量に上限なし（1オブジェクトは最大5TB）</td>
              </tr>
              <tr>
                <td><strong>従量課金</strong></td>
                <td>使った分だけ支払い。保存容量・リクエスト数・データ転送量で課金</td>
              </tr>
              <tr>
                <td><strong>グローバルアクセス</strong></td>
                <td>HTTPSでどこからでもアクセス可能</td>
              </tr>
            </table>
          </div>

          <div class="inline-slideshow">
            <div class="inline-slideshow-header">
              <span class="inline-slideshow-title">&#128451; S3の概要図解</span>
            </div>
            <div class="inline-slideshow-body">
              <div class="inline-slide-area">
                <button class="inline-slide-arrow" data-slideshow="s3overview" data-dir="prev" disabled>&#10094;</button>
                <div class="inline-slide-image-wrapper">
                  <img id="s3overview-slide-img" class="inline-slide-image" src="images/06/s3-01.png" alt="S3 1 / 3">
                </div>
                <button class="inline-slide-arrow" data-slideshow="s3overview" data-dir="next">&#10095;</button>
              </div>
              <div class="inline-slide-counter-area">
                <span id="s3overview-slide-counter" class="inline-slide-counter">1 / 3</span>
              </div>
              <div id="s3overview-slide-indicators" class="inline-slide-indicators"></div>
            </div>
          </div>
          <script>
            initInlineSlideshow('s3overview', {
              imgId: 's3overview-slide-img',
              counterId: 's3overview-slide-counter',
              indicatorsId: 's3overview-slide-indicators',
              folder: 'images/06',
              prefix: 's3-',
              pageCount: 3
            });
          </script>
        </div>
      `
    },

    // セクション2: バケットとオブジェクト
    {
      id: "6-2",
      title: "バケットとオブジェクト",
      type: "explanation",
      content: `
        <div class="chapter-container">
          <h2 class="section-title">バケットとオブジェクト</h2>

          <div class="term-box">
            <h3>バケット（Bucket）</h3>
            <p>オブジェクトを格納するコンテナ（入れ物）です。バケット名は<strong>グローバルで一意</strong>である必要があります（世界中で同じ名前は使えません）。</p>
          </div>

          <div class="info-box">
            <h3>バケット名の命名規則</h3>
            <ul>
              <li>3〜63文字の長さ</li>
              <li>小文字、数字、ハイフン（-）のみ使用可能</li>
              <li>先頭と末尾は文字または数字</li>
              <li>IPアドレス形式（192.168.1.1など）は不可</li>
              <li><strong>世界中で一意</strong>（他の誰も使っていない名前）</li>
            </ul>
            <div class="naming-examples">
              <div class="good-example">
                <span class="label">良い例</span>
                <code>my-company-images-2024</code>
                <code>prod-backup-tokyo</code>
              </div>
              <div class="bad-example">
                <span class="label">悪い例</span>
                <code>MyBucket（大文字不可）</code>
                <code>bucket_name（アンダースコア不可）</code>
              </div>
            </div>
          </div>

          <div class="term-box">
            <h3>オブジェクト（Object）</h3>
            <p>S3に保存される個々のデータ単位です。ファイル本体（データ）とメタデータで構成されます。</p>
          </div>

          <div class="point-box">
            <h3>オブジェクトの構成要素</h3>
            <table class="info-table">
              <tr>
                <th>要素</th>
                <th>説明</th>
              </tr>
              <tr>
                <td><strong>キー（Key）</strong></td>
                <td>オブジェクトの名前。バケット内で一意。「/」を含めるとコンソール上で疑似的なフォルダ表示になる</td>
              </tr>
              <tr>
                <td><strong>バリュー（Value）</strong></td>
                <td>実際のファイルデータ（最大5TB）</td>
              </tr>
              <tr>
                <td><strong>メタデータ</strong></td>
                <td>Content-Type、サイズ、更新日などの付加情報。カスタムメタデータも設定可能</td>
              </tr>
              <tr>
                <td><strong>バージョンID</strong></td>
                <td>バージョニング有効時に自動付与される識別子</td>
              </tr>
            </table>
          </div>

          <div style="text-align: center; margin: var(--space-lg) 0;">
            <img src="images/06/backet.png" alt="S3バケットとオブジェクトの構成" style="max-width: 100%; height: auto; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
          </div>

          <div class="info-box">
            <h3>S3 URL（エンドポイント）</h3>
            <p>S3オブジェクトには一意のURLが割り当てられます：</p>
            <div class="url-format">
              <div class="url-example">
                <div class="url-label">仮想ホスト形式（推奨）</div>
                <code>https://<span class="highlight-bucket">my-bucket</span>.s3.<span class="highlight-region">ap-northeast-1</span>.amazonaws.com/<span class="highlight-key">images/photo.jpg</span></code>
              </div>
            </div>
          </div>

          <div class="info-box">
            <h3>プレフィックス（疑似フォルダ）</h3>
            <p>S3には実際のフォルダ階層はありません。しかしキー名に「/」を含めると、AWSコンソールが「/」を<strong>デリミタ（区切り文字）</strong>として解釈し、フォルダ構造のように表示します。</p>
            <p>例えば <code>images/2024/photo.jpg</code> というキーの場合、<code>images/</code> や <code>images/2024/</code> の部分が<strong>プレフィックス</strong>と呼ばれます。実際にはフォルダは存在せず、あくまで1つのオブジェクト名（キー）です。</p>
          </div>
        </div>
      `
    },

    // セクション3: ストレージクラス
    {
      id: "6-3",
      title: "ストレージクラス",
      type: "explanation",
      content: `
        <div class="chapter-container">
          <h2 class="section-title">ストレージクラス</h2>

          <div class="term-box">
            <h3>ストレージクラスとは</h3>
            <p>データのアクセス頻度や可用性要件に応じて選択できる保存方式です。適切なクラスを選ぶことで<strong>コストを最適化</strong>できます。</p>
          </div>

          <div class="point-box">
            <h3>主なストレージクラス</h3>
            <table class="info-table">
              <tr>
                <th>クラス</th>
                <th>用途</th>
                <th>取り出し</th>
                <th>最低保存期間</th>
              </tr>
              <tr>
                <td><strong>S3 Standard</strong></td>
                <td>頻繁にアクセスするデータ</td>
                <td>即座</td>
                <td>なし</td>
              </tr>
              <tr>
                <td><strong>S3 Intelligent-Tiering</strong></td>
                <td>アクセスパターン不明・変動</td>
                <td>自動最適化</td>
                <td>なし</td>
              </tr>
              <tr>
                <td><strong>S3 Standard-IA</strong></td>
                <td>月1回程度のアクセス</td>
                <td>即座（取り出し料金あり）</td>
                <td>30日</td>
              </tr>
              <tr>
                <td><strong>S3 Glacier Instant</strong></td>
                <td>四半期1回程度のアクセス</td>
                <td>ミリ秒</td>
                <td>90日</td>
              </tr>
              <tr>
                <td><strong>S3 Glacier Flexible</strong></td>
                <td>年1回程度・アーカイブ</td>
                <td>1分〜12時間</td>
                <td>90日</td>
              </tr>
              <tr>
                <td><strong>S3 Glacier Deep Archive</strong></td>
                <td>規制対応・長期アーカイブ</td>
                <td>12〜48時間</td>
                <td>180日</td>
              </tr>
            </table>
          </div>

          <div class="info-box">
            <h3>ストレージクラスの選び方</h3>
            <div class="decision-flow">
              <div class="decision-node">
                <div class="question">どのくらいの頻度でアクセスしますか？</div>
                <div class="answers">
                  <div class="answer-branch">
                    <span class="answer">毎日・毎週</span>
                    <span class="arrow">&rarr;</span>
                    <span class="result">S3 Standard</span>
                  </div>
                  <div class="answer-branch">
                    <span class="answer">月1回程度</span>
                    <span class="arrow">&rarr;</span>
                    <span class="result">Standard-IA</span>
                  </div>
                  <div class="answer-branch">
                    <span class="answer">年数回・バックアップ</span>
                    <span class="arrow">&rarr;</span>
                    <span class="result">Glacier Instant/Flexible</span>
                  </div>
                  <div class="answer-branch">
                    <span class="answer">ほぼアクセスしない</span>
                    <span class="arrow">&rarr;</span>
                    <span class="result">Glacier Deep Archive</span>
                  </div>
                  <div class="answer-branch">
                    <span class="answer">わからない</span>
                    <span class="arrow">&rarr;</span>
                    <span class="result">Intelligent-Tiering</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="warning-box">
            <h3>注意：最低保存期間と取り出し料金</h3>
            <ul>
              <li>IA/Glacierクラスには<strong>最低保存期間</strong>があり、その前に削除しても課金されます</li>
              <li>Glacierクラスはデータ取り出しに<strong>追加料金</strong>がかかります</li>
              <li>小さいファイルが大量にある場合、監視料金が割高になることがあります</li>
            </ul>
          </div>

          <div class="info-box">
            <h3>ライフサイクルポリシー</h3>
            <p>S3には<strong>ライフサイクルポリシー</strong>という機能があり、オブジェクトの経過日数に応じてストレージクラスを自動的に移行したり、自動削除するルールを設定できます。例えば「30日後にStandard-IAに移行し、90日後にGlacierに移行、1年後に削除」といった設定が可能で、コスト最適化に非常に有効です。</p>
          </div>
        </div>
      `
    },

    // セクション4: S3のセキュリティ（元は6-5）
    {
      id: "6-4",
      title: "S3のセキュリティ",
      type: "explanation",
      content: `
        <div class="chapter-container">
          <h2 class="section-title">S3のセキュリティ</h2>

          <div class="warning-box">
            <h3>S3セキュリティの重要性</h3>
            <p>S3バケットの設定ミスによるデータ漏洩事故は後を絶ちません。<strong>デフォルトで非公開</strong>の設定を理解し、意図した範囲でのみアクセスを許可することが重要です。</p>
          </div>

          <div class="point-box">
            <h3>S3のアクセス制御レイヤー</h3>
            <table class="info-table">
              <tr>
                <th>レイヤー</th>
                <th>名前</th>
                <th>説明</th>
              </tr>
              <tr>
                <td><strong>1</strong></td>
                <td>ブロックパブリックアクセス</td>
                <td>最優先の「ゲートキーパー」。有効なら他の設定を上書きして公開をブロック</td>
              </tr>
              <tr>
                <td><strong>2</strong></td>
                <td>バケットポリシー</td>
                <td>バケット単位のJSON形式アクセス許可ルール</td>
              </tr>
              <tr>
                <td><strong>3</strong></td>
                <td><span class="aws-keyword" data-service="IAM">IAM</span>ポリシー</td>
                <td>ユーザー/ロール側で設定するアクセス許可</td>
              </tr>
              <tr>
                <td><strong>4</strong></td>
                <td>ACL（アクセスコントロールリスト）</td>
                <td>レガシー機能。現在は基本的に無効推奨</td>
              </tr>
            </table>
          </div>

          <div class="term-box">
            <h3>ブロックパブリックアクセス</h3>
            <p>バケットやオブジェクトが意図せず公開されることを防ぐ<strong>セーフティネット機能</strong>です。<strong>デフォルトで全て有効</strong>になっています。公開が必要な明確な理由がない限り、全て有効のままにしましょう。</p>
          </div>

          <div class="term-box">
            <h3>バケットポリシー</h3>
            <p>バケット単位で設定するJSON形式のアクセス許可ルールです。「誰が」「何を」「どのリソースに」できるかを定義します。</p>
          </div>

          <div class="code-example">
            <h3>バケットポリシーの例（<span class="aws-keyword" data-service="CloudFront">CloudFront</span>からのアクセスを許可）</h3>
            <pre><code class="language-json">{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowCloudFrontAccess",
      "Effect": "Allow",
      "Principal": {
        "Service": "cloudfront.amazonaws.com"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::my-bucket/*"
    }
  ]
}</code></pre>
          </div>

          <div class="term-box">
            <h3>サーバーサイド暗号化（SSE）</h3>
            <p>S3に保存するデータを自動的に暗号化する機能です。現在は<strong>デフォルトで有効</strong>（SSE-S3）になっています。より厳密な制御が必要な場合はSSE-KMS（AWS KMS管理の鍵）やSSE-C（顧客管理の鍵）も選択できます。</p>
          </div>

          <div class="point-box">
            <h3>S3セキュリティのベストプラクティス</h3>
            <ul>
              <li><strong>ブロックパブリックアクセスを有効に保つ</strong>（アカウントレベルでも設定推奨）</li>
              <li><strong>最小権限の原則</strong>を適用した<span class="aws-keyword" data-service="IAM">IAM</span>ポリシー/バケットポリシー</li>
              <li><strong>バージョニングを有効化</strong>して誤削除に備える</li>
              <li><strong>サーバーアクセスログ</strong>を別バケットに記録</li>
            </ul>
          </div>

          <div class="warning-box">
            <h3>よくあるセキュリティ事故</h3>
            <ul>
              <li>「一時的に公開」したつもりが、そのまま放置</li>
              <li>バケットポリシーで「*」（全員）に許可を与えてしまう</li>
              <li>アクセスキーをソースコードに直接記述して公開リポジトリにプッシュ</li>
            </ul>
          </div>
        </div>
      `
    },

    // セクション5: 静的ウェブサイトホスティング（元は6-6）
    {
      id: "6-5",
      title: "静的ウェブサイトホスティング",
      type: "explanation",
      content: `
        <div class="chapter-container">
          <h2 class="section-title">静的ウェブサイトホスティング</h2>

          <div class="term-box">
            <h3>静的ウェブサイトホスティングとは</h3>
            <p>S3バケットをウェブサーバーとして使い、<strong>HTML/CSS/JavaScript</strong>などの静的コンテンツを直接配信できる機能です。サーバー管理不要で低コストにウェブサイトを公開できます。</p>
          </div>

          <div class="comparison-container">
            <h3>静的サイト vs 動的サイト</h3>
            <div class="comparison-grid">
              <div class="comparison-item highlight">
                <h4>静的サイト（S3で可能）</h4>
                <div class="comparison-content">
                  <ul>
                    <li>HTML/CSS/JavaScriptで構成</li>
                    <li>全ユーザーに同じ内容を配信</li>
                    <li>例：ランディングページ、ドキュメントサイト、ポートフォリオ</li>
                  </ul>
                </div>
              </div>
              <div class="comparison-item">
                <h4>動的サイト（S3単独では不可）</h4>
                <div class="comparison-content">
                  <ul>
                    <li>サーバーサイド処理が必要</li>
                    <li>ユーザーごとに異なる内容</li>
                    <li>例：EC、SNS、管理画面</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="point-box">
            <h3>設定に必要な項目</h3>
            <table class="info-table">
              <tr>
                <th>設定項目</th>
                <th>説明</th>
              </tr>
              <tr>
                <td><strong>インデックスドキュメント</strong></td>
                <td>ルートにアクセスした時に返すファイル（例：index.html）</td>
              </tr>
              <tr>
                <td><strong>エラードキュメント</strong></td>
                <td>404エラー時に返すファイル（例：error.html）</td>
              </tr>
              <tr>
                <td><strong>ブロックパブリックアクセス</strong></td>
                <td>公開のため一部無効化が必要</td>
              </tr>
              <tr>
                <td><strong>バケットポリシー</strong></td>
                <td>パブリック読み取りを許可するポリシー</td>
              </tr>
            </table>
          </div>

          <div class="info-box">
            <h3>静的ウェブサイトのエンドポイント</h3>
            <p>静的ウェブサイトホスティングを有効にすると、専用のエンドポイントURLが発行されます：</p>
            <div class="endpoint-format">
              <code>http://<span class="highlight-bucket">バケット名</span>.s3-website-<span class="highlight-region">リージョン</span>.amazonaws.com</code>
            </div>
            <p class="mt-2">例：<code>http://my-website.s3-website-ap-northeast-1.amazonaws.com</code></p>
          </div>

          <div class="warning-box">
            <h3>静的ホスティングの制限</h3>
            <ul>
              <li><strong>HTTPSに非対応</strong>（S3単独では）&rarr; <span class="aws-keyword" data-service="CloudFront">CloudFront</span>と組み合わせて解決</li>
              <li><strong>サーバーサイド処理不可</strong> &rarr; API Gatewayや<span class="aws-keyword" data-service="Lambda">Lambda</span>と組み合わせ</li>
              <li><strong>カスタムドメイン使用時</strong>はバケット名＝ドメイン名にする必要あり</li>
            </ul>
          </div>

          <div class="info-box">
            <h3>本番環境でのベストプラクティス</h3>
            <ul>
              <li><strong><span class="aws-keyword" data-service="CloudFront">CloudFront</span>を前段に配置</strong>：HTTPS対応、キャッシュによる高速化</li>
              <li><strong>OAC（Origin Access Control）を使用</strong>：S3への直接アクセスをブロック</li>
              <li><strong>Route 53で独自ドメイン</strong>：ブランディングとSEO対策</li>
            </ul>
          </div>

          <div class="summary-box">
            <h3>第6章のまとめ</h3>
            <ul>
              <li><span class="aws-keyword" data-service="s3">S3</span>は容量無制限・高耐久性のオブジェクトストレージサービス</li>
              <li>データは<strong>バケット</strong>（コンテナ）の中に<strong>オブジェクト</strong>（キー＋データ＋メタデータ）として保存される</li>
              <li><strong>ストレージクラス</strong>をアクセス頻度に応じて選択することでコストを最適化できる</li>
              <li>セキュリティでは<strong>ブロックパブリックアクセス</strong>と<strong>バケットポリシー</strong>の理解が重要</li>
              <li><strong>静的ウェブサイトホスティング</strong>で、サーバーなしでWebサイトを公開できる</li>
            </ul>
          </div>

          <div class="point-box" style="margin-top: 30px;">
            <div class="point-box-title">&#128214; AWS公式ドキュメント参照先</div>
            <ul class="feature-list">
              <li><a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html" target="_blank" rel="noopener">Amazon S3とは（User Guide）</a> / <a href="https://aws.amazon.com/s3/pricing/" target="_blank" rel="noopener">S3料金</a></li>
              <li><a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/creating-buckets-s3.html" target="_blank" rel="noopener">バケットの作成</a> / <a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucketnamingrules.html" target="_blank" rel="noopener">バケット命名規則</a></li>
              <li><a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html" target="_blank" rel="noopener">ストレージクラス</a> / <a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/intelligent-tiering.html" target="_blank" rel="noopener">Intelligent-Tiering</a></li>
              <li><a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lifecycle-mgmt.html" target="_blank" rel="noopener">ライフサイクルポリシー</a></li>
              <li><a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-control-block-public-access.html" target="_blank" rel="noopener">ブロックパブリックアクセス</a> / <a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucket-policies.html" target="_blank" rel="noopener">バケットポリシー</a></li>
              <li><a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/serv-side-encryption.html" target="_blank" rel="noopener">サーバーサイド暗号化</a></li>
              <li><a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html" target="_blank" rel="noopener">静的ウェブサイトホスティング</a> / <a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/Versioning.html" target="_blank" rel="noopener">バージョニング</a></li>
            </ul>
          </div>
        </div>
      `
    },

    // 理解度テスト
    {
      id: "6-quiz",
      title: "第6章 理解度テスト",
      type: "quiz",
      questions: [
        {
          question: "S3のストレージ耐久性として正しいものはどれですか？",
          options: [
            { label: "A", text: "99.9%（スリーナイン）" },
            { label: "B", text: "99.99%（フォーナイン）" },
            { label: "C", text: "99.999999999%（イレブンナイン）" },
            { label: "D", text: "100%（完全耐久）" }
          ],
          correct: 2,
          explanation: {
            correct: "正解です！S3は99.999999999%（イレブンナイン）の耐久性を持ちます。これは100億個のオブジェクトを保存しても、10年間で1個の損失確率という驚異的な耐久性です。",
            incorrect: "不正解です。S3は99.999999999%（イレブンナイン）の耐久性を持ちます。これは100億個のオブジェクトを保存しても、10年間で1個の損失確率という驚異的な耐久性です。"
          }
        },
        {
          question: "S3バケット名の命名規則として正しいものはどれですか？",
          options: [
            { label: "A", text: "世界中で一意である必要がある" },
            { label: "B", text: "アンダースコア（_）が使用できる" },
            { label: "C", text: "大文字と小文字の両方が使用できる" },
            { label: "D", text: "最大256文字まで使用できる" }
          ],
          correct: 0,
          explanation: {
            correct: "正解です！S3バケット名はグローバルで一意である必要があります。また、小文字・数字・ハイフンのみ使用可能で、3〜63文字という制限があります。",
            incorrect: "不正解です。S3バケット名はグローバルで一意である必要があります。大文字やアンダースコアは使用できず、3〜63文字という制限があります。"
          }
        },
        {
          question: "アクセス頻度が不明なデータに最適なストレージクラスはどれですか？",
          options: [
            { label: "A", text: "S3 Standard" },
            { label: "B", text: "S3 Intelligent-Tiering" },
            { label: "C", text: "S3 Glacier" },
            { label: "D", text: "S3 Standard-IA" }
          ],
          correct: 1,
          explanation: {
            correct: "正解です！S3 Intelligent-Tieringは、アクセスパターンを自動で分析し、最適なストレージ層に自動移動します。アクセス頻度が予測できない場合に最適です。",
            incorrect: "不正解です。S3 Intelligent-Tieringは、アクセスパターンを自動で分析し、最適なストレージ層に自動移動します。アクセス頻度が予測できない場合に最適です。"
          }
        },
        {
          question: "S3のセキュリティ機能「ブロックパブリックアクセス」について正しい説明はどれですか？",
          options: [
            { label: "A", text: "デフォルトで無効になっており、手動で有効にする必要がある" },
            { label: "B", text: "一度有効にすると無効に戻せない" },
            { label: "C", text: "バケット単位でのみ設定可能で、アカウント単位では設定できない" },
            { label: "D", text: "有効にすると、他のポリシー設定を上書きして公開をブロックする" }
          ],
          correct: 3,
          explanation: {
            correct: "正解です！ブロックパブリックアクセスは「ゲートキーパー」として機能し、有効な場合は他のポリシー設定（バケットポリシーやACL）を上書きしてパブリックアクセスをブロックします。",
            incorrect: "不正解です。ブロックパブリックアクセスはデフォルトで有効であり、有効な場合は他のポリシー設定を上書きしてパブリックアクセスをブロックします。アカウント単位とバケット単位の両方で設定可能で、設定は変更可能です。"
          }
        },
        {
          question: "S3静的ウェブサイトホスティングの制限として正しいものはどれですか？",
          options: [
            { label: "A", text: "HTMLファイルはアップロードできない" },
            { label: "B", text: "CSSファイルは使用できない" },
            { label: "C", text: "JavaScriptファイルは実行できない" },
            { label: "D", text: "S3単独ではHTTPSに対応していない" }
          ],
          correct: 3,
          explanation: {
            correct: "正解です！S3の静的ウェブサイトホスティングはHTTPのみ対応しており、HTTPS（SSL/TLS）を使用するにはCloudFrontと組み合わせる必要があります。HTML/CSS/JavaScriptファイルは問題なく使用できます。",
            incorrect: "不正解です。S3の静的ウェブサイトホスティングはHTML/CSS/JavaScriptを問題なくホスティングできます。制限として、S3単独ではHTTPSに対応しておらず、CloudFrontと組み合わせる必要があります。"
          }
        }
      ]
    },
    // 修了画面
    {
      id: "6-complete",
      title: "修了",
      type: "explanation",
      content: `
        <div class="chapter-container">
          <div class="confetti-container" id="confetti-container"></div>

          <div class="completion-screen">
            <div class="completion-badge">&#127891;</div>
            <h2 class="completion-title">全6章 修了おめでとうございます！</h2>
            <p class="completion-subtitle">AWS クラウド技術入門のすべての章を学習しました</p>
            <div class="completion-chapters">
              <div class="completion-chapter-item"><span class="completion-check">&#10003;</span>01 AWSの概要</div>
              <div class="completion-chapter-item"><span class="completion-check">&#10003;</span>02 IAM</div>
              <div class="completion-chapter-item"><span class="completion-check">&#10003;</span>03 VPC</div>
              <div class="completion-chapter-item"><span class="completion-check">&#10003;</span>04 EC2</div>
              <div class="completion-chapter-item"><span class="completion-check">&#10003;</span>05 RDS</div>
              <div class="completion-chapter-item"><span class="completion-check">&#10003;</span>06 S3</div>
            </div>
            <div class="completion-actions">
              <button class="completion-btn completion-btn-primary" onclick="navigateToChapter(0)">最初に戻る</button>
            </div>
          </div>
        </div>

        <script>
          (function() {
            const container = document.getElementById('confetti-container');
            if (!container) return;
            const colors = ['#FF9900', '#EC7211', '#FFAC31', '#232F3E', '#146EB4', '#4CAF50', '#E91E63', '#FFD700'];
            const shapes = ['square', 'circle', 'triangle'];
            for (let i = 0; i < 80; i++) {
              const piece = document.createElement('div');
              const shape = shapes[Math.floor(Math.random() * shapes.length)];
              piece.className = 'confetti-piece confetti-' + shape;
              piece.style.left = Math.random() * 100 + '%';
              piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
              piece.style.animationDelay = (Math.random() * 3) + 's';
              piece.style.animationDuration = (3 + Math.random() * 4) + 's';
              const size = 6 + Math.random() * 10;
              piece.style.width = size + 'px';
              piece.style.height = (shape === 'circle' ? size : size * 0.6) + 'px';
              container.appendChild(piece);
            }
            // 8秒後にフェードアウト
            setTimeout(function() {
              container.style.transition = 'opacity 2s';
              container.style.opacity = '0';
            }, 8000);
          })();
        </script>
      `
    }
  ]
};
