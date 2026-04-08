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
    // ハンズオン: S3バケットの作成とファイルのアップロード
    {
      id: "6-handson1",
      title: "ハンズオン：S3バケットの作成とファイルのアップロード",
      type: "explanation",
      content: `
        <div class="chapter-container">
          <h2 class="section-title">ハンズオン：S3バケットの作成とファイルのアップロード</h2>
          
          <div class="point-box">
            <ul class="feature-list">
              <li><strong>操作場所：</strong> AWSマネジメントコンソール ＆ ローカル</li>
              <li><strong>ゴール：</strong> S3バケットを作成し、ローカルファイルをアップロードする。その後、アップロードしたファイルにアクセスする。</li>
            </ul>
          </div>

          <h3 class="section-subtitle">バケットの作成</h3>
          
          <!-- S3バケット作成全体像 スライドショー -->
          <div class="inline-slideshow" id="create-s3-all-slideshow">
            <div class="inline-slideshow-header">
              <p class="inline-slideshow-title">S3バケット作成全体像</p>
            </div>
            <div class="inline-slideshow-body">
              <div class="inline-slide-area">
                <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="create-s3-all" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                <div class="inline-slide-image-wrapper">
                  <img class="inline-slide-image" id="create-s3-all-slide-img" src="images/06/handson/create-s3-all.png" alt="S3バケット作成全体像">
                </div>
                <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="create-s3-all" data-dir="next" aria-label="次のスライド">&#10095;</button>
              </div>
              <div class="inline-slide-counter-area">
                <span class="inline-slide-counter" id="create-s3-all-counter">1 / 1</span>
              </div>
              <div class="inline-slide-indicators" id="create-s3-all-indicators"></div>
            </div>
          </div>

          <script>
            initInlineSlideshow('create-s3-all', {
              folder: 'images/06/handson',
              prefix: 'create-s3-all',
              pageCount: 1,
              imgId: 'create-s3-all-slide-img',
              counterId: 'create-s3-all-counter',
              indicatorsId: 'create-s3-all-indicators'
            });
          </script>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">1</span>
              <span class="step-title">S3サービスを開く</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph">コンソール上部の検索窓に「S3」と入力し、サービス一覧から「S3」を選択してダッシュボードを開きます。</p>
              
              <!-- S3バケット作成手順1 スライドショー -->
              <div class="inline-slideshow" id="create-s3-1-slideshow">
                <div class="inline-slideshow-header">
                  <p class="inline-slideshow-title">&#128196; 画面例</p>
                </div>
                <div class="inline-slideshow-body">
                  <div class="inline-slide-area">
                    <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="create-s3-1" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                    <div class="inline-slide-image-wrapper">
                      <img class="inline-slide-image" id="create-s3-1-slide-img" src="images/06/handson/create-s3-101.png" alt="S3バケット作成手順1 1 / 2">
                    </div>
                    <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="create-s3-1" data-dir="next" aria-label="次のスライド">&#10095;</button>
                  </div>
                  <div class="inline-slide-counter-area">
                    <span class="inline-slide-counter" id="create-s3-1-counter">1 / 2</span>
                  </div>
                  <div class="inline-slide-indicators" id="create-s3-1-indicators"></div>
                </div>
              </div>

              <script>
                initInlineSlideshow('create-s3-1', {
                  folder: 'images/06/handson',
                  prefix: 'create-s3-1',
                  pageCount: 2,
                  imgId: 'create-s3-1-slide-img',
                  counterId: 'create-s3-1-counter',
                  indicatorsId: 'create-s3-1-indicators'
                });
              </script>
            </div>
          </div>
          
          <div class="step-container">
            <div class="step-header">
              <span class="step-number">2</span>
              <span class="step-title">バケットの作成開始</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph">画面右側の「バケットを作成」をクリックします。</p>

              <!-- S3バケット作成手順2 スライドショー -->
              <div class="inline-slideshow" id="create-s3-2-slideshow">
                <div class="inline-slideshow-header">
                  <p class="inline-slideshow-title">&#128196; 画面例</p>
                </div>
                <div class="inline-slideshow-body">
                  <div class="inline-slide-area">
                    <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="create-s3-2" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                    <div class="inline-slide-image-wrapper">
                      <img class="inline-slide-image" id="create-s3-2-slide-img" src="images/06/handson/create-s3-102.png" alt="S3バケット作成手順2 1 / 1">
                    </div>
                    <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="create-s3-2" data-dir="next" aria-label="次のスライド">&#10095;</button>
                  </div>
                  <div class="inline-slide-counter-area">
                    <span class="inline-slide-counter" id="create-s3-2-counter">1 / 1</span>
                  </div>
                  <div class="inline-slide-indicators" id="create-s3-2-indicators"></div>
                </div>
              </div>

              <script>
                initInlineSlideshow('create-s3-2', {
                  folder: 'images/06/handson',
                  prefix: 'create-s3-2',
                  pageCount: 1,
                  imgId: 'create-s3-2-slide-img',
                  counterId: 'create-s3-2-counter',
                  indicatorsId: 'create-s3-2-indicators'
                });
              </script>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">3</span>
              <span class="step-title">一般的な設定</span>
            </div>
            <div class="step-content">
              <ul class="feature-list">
                <li><strong>AWSリージョン：</strong> アジアパシフィック (東京) ap-northeast-1</li>
                <li><strong>バケットタイプ：</strong> 汎用</li>
                <li><strong>バケット名前空間：</strong> グローバル名前空間</li>
                <li><strong>バケット名：</strong> s3-handson-YYYYMMDD-XX</li>
                <small>※世界中で一意である必要があります。例：<code>s3-handson-YYYYMMDD-XX</code> など</small>
              </ul>

              
              <!-- S3バケット作成手順3 スライドショー -->
              <div class="inline-slideshow" id="create-s3-3-slideshow">
                <div class="inline-slideshow-header">
                  <p class="inline-slideshow-title">&#128196; 画面例</p>
                </div>
                <div class="inline-slideshow-body">
                  <div class="inline-slide-area">
                    <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="create-s3-3" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                    <div class="inline-slide-image-wrapper">
                      <img class="inline-slide-image" id="create-s3-3-slide-img" src="images/06/handson/create-s3-103.png" alt="S3バケット作成手順3 1 / 1">
                    </div>
                    <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="create-s3-3" data-dir="next" aria-label="次のスライド">&#10095;</button>
                  </div>
                  <div class="inline-slide-counter-area">
                    <span class="inline-slide-counter" id="create-s3-3-counter">1 / 1</span>
                  </div>
                  <div class="inline-slide-indicators" id="create-s3-3-indicators"></div>
                </div>
              </div>

              <script>
                initInlineSlideshow('create-s3-3', {
                  folder: 'images/06/handson',
                  prefix: 'create-s3-3',
                  pageCount: 1,
                  imgId: 'create-s3-3-slide-img',
                  counterId: 'create-s3-3-counter',
                  indicatorsId: 'create-s3-3-indicators'
                });
              </script>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">4</span>
              <span class="step-title">オブジェクト所有者</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph"><strong>「ACL無効」</strong>を選択します。</p>

              <div class="info-box" style="margin-top: 20px; margin-bottom: 20px;">
                <div class="info-box-title">&#128161; ACLとは？なぜ無効にするの？</div>
                <p style="margin-top: 10px; margin-bottom: 0;"><strong>ACL（アクセスコントロールリスト）</strong>は、バケットやファイルごとにアクセス権限を設定するレガシー（古い）な仕組みです。現在AWSでは、より安全で管理しやすい「IAMポリシー」や「バケットポリシー」での一元管理を強く推奨しています。そのため、特別な理由がない限り「ACL無効」を選択し、古い仕組みを使わない設定にするのが現在のベストプラクティスです。</p>
              </div>

              <!-- S3バケット作成手順4 スライドショー -->
              <div class="inline-slideshow" id="create-s3-4-slideshow">
                <div class="inline-slideshow-header">
                  <p class="inline-slideshow-title">&#128196; 画面例</p>
                </div>
                <div class="inline-slideshow-body">
                  <div class="inline-slide-area">
                    <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="create-s3-4" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                    <div class="inline-slide-image-wrapper">
                      <img class="inline-slide-image" id="create-s3-4-slide-img" src="images/06/handson/create-s3-104.png" alt="S3バケット作成手順4 1 / 1">
                    </div>
                    <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="create-s3-4" data-dir="next" aria-label="次のスライド">&#10095;</button>
                  </div>
                  <div class="inline-slide-counter-area">
                    <span class="inline-slide-counter" id="create-s3-4-counter">1 / 1</span>
                  </div>
                  <div class="inline-slide-indicators" id="create-s3-4-indicators"></div>
                </div>
              </div>

              <script>
                initInlineSlideshow('create-s3-4', {
                  folder: 'images/06/handson',
                  prefix: 'create-s3-4',
                  pageCount: 1,
                  imgId: 'create-s3-4-slide-img',
                  counterId: 'create-s3-4-counter',
                  indicatorsId: 'create-s3-4-indicators'
                });
              </script>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">5</span>
              <span class="step-title">ブロックパブリックアクセス設定</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph"><strong>「パブリックアクセスをすべてブロック」</strong>にチェックが入っていることを確認します。</p>

              <!-- S3バケット作成手順5 スライドショー -->
              <div class="inline-slideshow" id="create-s3-5-slideshow">
                <div class="inline-slideshow-header">
                  <p class="inline-slideshow-title">&#128196; 画面例</p>
                </div>
                <div class="inline-slideshow-body">
                  <div class="inline-slide-area">
                    <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="create-s3-5" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                    <div class="inline-slide-image-wrapper">
                      <img class="inline-slide-image" id="create-s3-5-slide-img" src="images/06/handson/create-s3-105.png" alt="S3バケット作成手順5 1 / 1">
                    </div>
                    <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="create-s3-5" data-dir="next" aria-label="次のスライド">&#10095;</button>
                  </div>
                  <div class="inline-slide-counter-area">
                    <span class="inline-slide-counter" id="create-s3-5-counter">1 / 1</span>
                  </div>
                  <div class="inline-slide-indicators" id="create-s3-5-indicators"></div>
                </div>
              </div>

              <script>
                initInlineSlideshow('create-s3-5', {
                  folder: 'images/06/handson',
                  prefix: 'create-s3-5',
                  pageCount: 1,
                  imgId: 'create-s3-5-slide-img',
                  counterId: 'create-s3-5-counter',
                  indicatorsId: 'create-s3-5-indicators'
                });
              </script>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">6</span>
              <span class="step-title">バケットのバージョニング</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph">「バケットのバージョニング」の<strong>「無効にする」</strong>を選択します。</p>

              <div class="info-box" style="margin-top: 20px; margin-bottom: 20px;">
                <div class="info-box-title">&#128161; なぜ無効にするの？</div>
                <p style="margin-top: 10px; margin-bottom: 0;">バージョニングを有効にすると、ファイルを上書きしても過去のバージョンがすべて保存されます。誤操作からの復旧には便利ですが、<strong>過去のバージョンもすべてストレージ容量として課金対象</strong>となるため、学習・テスト目的の場合は「無効」にしてコストを節約するのがおすすめです。</p>
              </div>

              <!-- S3バケット作成手順6 スライドショー -->
              <div class="inline-slideshow" id="create-s3-6-slideshow">
                <div class="inline-slideshow-header">
                  <p class="inline-slideshow-title">&#128196; 画面例</p>
                </div>
                <div class="inline-slideshow-body">
                  <div class="inline-slide-area">
                    <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="create-s3-6" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                    <div class="inline-slide-image-wrapper">
                      <img class="inline-slide-image" id="create-s3-6-slide-img" src="images/06/handson/create-s3-106.png" alt="S3バケット作成手順6 1 / 1">
                    </div>
                    <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="create-s3-6" data-dir="next" aria-label="次のスライド">&#10095;</button>
                  </div>
                  <div class="inline-slide-counter-area">
                    <span class="inline-slide-counter" id="create-s3-6-counter">1 / 1</span>
                  </div>
                  <div class="inline-slide-indicators" id="create-s3-6-indicators"></div>
                </div>
              </div>

              <script>
                initInlineSlideshow('create-s3-6', {
                  folder: 'images/06/handson',
                  prefix: 'create-s3-6',
                  pageCount: 1,
                  imgId: 'create-s3-6-slide-img',
                  counterId: 'create-s3-6-counter',
                  indicatorsId: 'create-s3-6-indicators'
                });
              </script>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">7</span>
              <span class="step-title">バケットの作成</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph">その他の設定はデフォルトのまま、画面の一番下にある<strong>「バケットを作成」</strong>をクリックします。</p>

              <!-- S3バケット作成手順7 スライドショー -->
              <div class="inline-slideshow" id="create-s3-7-slideshow">
                <div class="inline-slideshow-header">
                  <p class="inline-slideshow-title">&#128196; 画面例</p>
                </div>
                <div class="inline-slideshow-body">
                  <div class="inline-slide-area">
                    <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="create-s3-7" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                    <div class="inline-slide-image-wrapper">
                      <img class="inline-slide-image" id="create-s3-7-slide-img" src="images/06/handson/create-s3-107.png" alt="S3バケット作成手順7 1 / 2">
                    </div>
                    <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="create-s3-7" data-dir="next" aria-label="次のスライド">&#10095;</button>
                  </div>
                  <div class="inline-slide-counter-area">
                    <span class="inline-slide-counter" id="create-s3-7-counter">1 / 2</span>
                  </div>
                  <div class="inline-slide-indicators" id="create-s3-7-indicators"></div>
                </div>
              </div>

              <script>
                initInlineSlideshow('create-s3-7', {
                  folder: 'images/06/handson',
                  prefix: 'create-s3-7',
                  pageCount: 2,
                  imgId: 'create-s3-7-slide-img',
                  counterId: 'create-s3-7-counter',
                  indicatorsId: 'create-s3-7-indicators'
                });
              </script>
            </div>
          </div>

          <!-- ファイルのアップロード -->
          <h3 class="section-subtitle">ファイルのアップロード</h3>
          
          <!-- ファイルアップロード全体像 スライドショー -->
          <div class="inline-slideshow" id="upload-s3-all-slideshow">
            <div class="inline-slideshow-header">
              <p class="inline-slideshow-title">ファイルアップロード全体像</p>
            </div>
            <div class="inline-slideshow-body">
              <div class="inline-slide-area">
                <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="upload-s3-all" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                <div class="inline-slide-image-wrapper">
                  <img class="inline-slide-image" id="upload-s3-all-slide-img" src="images/06/handson/upload-s3-all.png" alt="ファイルアップロード全体像">
                </div>
                <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="upload-s3-all" data-dir="next" aria-label="次のスライド">&#10095;</button>
              </div>
              <div class="inline-slide-counter-area">
                <span class="inline-slide-counter" id="upload-s3-all-counter">1 / 1</span>
              </div>
              <div class="inline-slide-indicators" id="upload-s3-all-indicators"></div>
            </div>
          </div>

          <script>
            initInlineSlideshow('upload-s3-all', {
              folder: 'images/06/handson',
              prefix: 'upload-s3-all',
              pageCount: 1,
              imgId: 'upload-s3-all-slide-img',
              counterId: 'upload-s3-all-counter',
              indicatorsId: 'upload-s3-all-indicators'
            });
          </script>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">1</span>
              <span class="step-title">テスト画像のダウンロード</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph"><strong>【ローカル】</strong><br>
              アップロード用のテスト画像をダウンロードします。<code>test-image.png</code> などの名前で任意の場所（例：Downloadsフォルダ）に保存しておきます。</p>

              <!-- テスト画像のダウンロードリンクを追加 -->
              <div style="text-align: center; margin: 20px 0;">
                <button onclick="const link = document.createElement('a'); link.href = 'data:image/png;base64,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kBkAAChkBgAACpkBAIBCZgAAoJAZAAAoZAYAAAqZAQCAQmYAAKCQGQAAKGQGAAAKmQEAgEJmAACgkBkAAChkBgAACpkBAIBCZgAAoJAZAAAoZAYAAAqZAQCAQmYAAKCQGQAAKGQGAAAKmQEAgEJmAACgkBkAAChkBgAACpkBAIBCZgAAoJAZAAAoZAYAAAqZAQCAQmYAAKCQGQAAKGQGAAAKmQEAgEJmAACgkBkAAChkBgAACpkBAIBCZgAAoJAZAAAoZAYAAAqZAQCAQmYAAKCQGQAAKGQGAAAKmQEAgEJmAACgkBkAAChkBgAACpkBAIBCZgAAoJAZAAAoZAYAAAqZAQCAQmYAAKCQGQAAKGQGAAAKmQEAgEJmAACgkBkAAChkBgAACpkBAIBCZgAAoJAZAAAoZAYAAAqZAQCAQmYAAKCQGQAAKGQGAAAKmQEAgEJmAACgkBkAAChkBgAACpkBAIBCZgAAoJAZAAAoZAYAAAqZAQCAQmYAAKCQGQAAKGQGAAAKmQEAgEJmAACgkBkAAChkBgAACpkBAIBCZgAAoJAZAAAoZAYAAAqZAQCAQmYAAKCQGQAAKGQGAAAKmQEAgEJmAACgkBkAAChkBgAACpkBAIBCZgAAoJAZAAAoZAYAAAqZAQCAQmYAAKCQGQAAKGQGAAAKmQEAgEJmAACg8P8Adc8oLtfXV4kAAAAASUVORK5CYII='; link.download = 'test-image.png'; link.click();" style="display: inline-flex; align-items: center; justify-content: center; background-color: #e3f2fd; color: #1976d2; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; box-shadow: 0 4px 6px rgba(25, 118, 210, 0.1); border: 1px solid #bbdefb; transition: all 0.3s ease; cursor: pointer; outline: none;">
                  &darr; テスト画像をダウンロード
                </button>
              </div>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">2</span>
              <span class="step-title">アップロード画面を開く</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph"><strong>【AWSマネジメントコンソール】</strong><br>
              バケット詳細画面にて、「アップロード」ボタンをクリックします。</p>

              <!-- S3バケットアップロード手順2 スライドショー -->
              <div class="inline-slideshow" id="upload-s3-2-slideshow">
                <div class="inline-slideshow-header">
                  <p class="inline-slideshow-title">&#128196; 画面例</p>
                </div>
                <div class="inline-slideshow-body">
                  <div class="inline-slide-area">
                    <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="upload-s3-2" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                    <div class="inline-slide-image-wrapper">
                      <img class="inline-slide-image" id="upload-s3-2-slide-img" src="images/06/handson/upload-s3-2.png" alt="S3バケットアップロード手順2 1 / 1">
                    </div>
                    <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="upload-s3-2" data-dir="next" aria-label="次のスライド">&#10095;</button>
                  </div>
                  <div class="inline-slide-counter-area">
                    <span class="inline-slide-counter" id="upload-s3-2-counter">1 / 1</span>
                  </div>
                  <div class="inline-slide-indicators" id="upload-s3-2-indicators"></div>
                </div>
              </div>

              <script>
                initInlineSlideshow('upload-s3-2', {
                  folder: 'images/06/handson',
                  prefix: 'upload-s3-2',
                  pageCount: 1,
                  imgId: 'upload-s3-2-slide-img',
                  counterId: 'upload-s3-2-counter',
                  indicatorsId: 'upload-s3-2-indicators'
                });
              </script>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">3</span>
              <span class="step-title">ファイルの追加</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph">「ファイルを追加」をクリックし、手順6で作成した <code>test-image.png</code> を選択します。</p>

              <!-- S3バケットアップロード手順3 スライドショー -->
              <div class="inline-slideshow" id="upload-s3-3-slideshow">
                <div class="inline-slideshow-header">
                  <p class="inline-slideshow-title">&#128196; 画面例</p>
                </div>
                <div class="inline-slideshow-body">
                  <div class="inline-slide-area">
                    <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="upload-s3-3" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                    <div class="inline-slide-image-wrapper">
                      <img class="inline-slide-image" id="upload-s3-3-slide-img" src="images/06/handson/upload-s3-3.png" alt="S3バケットアップロード手順3 1 / 2">
                    </div>
                    <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="upload-s3-3" data-dir="next" aria-label="次のスライド">&#10095;</button>
                  </div>
                  <div class="inline-slide-counter-area">
                    <span class="inline-slide-counter" id="upload-s3-3-counter">1 / 2</span>
                  </div>
                  <div class="inline-slide-indicators" id="upload-s3-3-indicators"></div>
                </div>
              </div>

              <script>
                initInlineSlideshow('upload-s3-3', {
                  folder: 'images/06/handson',
                  prefix: 'upload-s3-3',
                  pageCount: 2,
                  imgId: 'upload-s3-3-slide-img',
                  counterId: 'upload-s3-3-counter',
                  indicatorsId: 'upload-s3-3-indicators'
                });
              </script>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">4</span>
              <span class="step-title">アップロード実行</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph">画面下部の「アップロード」をクリックし、「アップロードが成功しました」と表示されることを確認します。</p>

              <!-- S3バケットアップロード手順4 スライドショー -->
              <div class="inline-slideshow" id="upload-s3-4-slideshow">
                <div class="inline-slideshow-header">
                  <p class="inline-slideshow-title">&#128196; 画面例</p>
                </div>
                <div class="inline-slideshow-body">
                  <div class="inline-slide-area">
                    <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="upload-s3-4" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                    <div class="inline-slide-image-wrapper">
                      <img class="inline-slide-image" id="upload-s3-4-slide-img" src="images/06/handson/upload-s3-4.png" alt="S3バケットアップロード手順4 1 / 2">
                    </div>
                    <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="upload-s3-4" data-dir="next" aria-label="次のスライド">&#10095;</button>
                  </div>
                  <div class="inline-slide-counter-area">
                    <span class="inline-slide-counter" id="upload-s3-4-counter">1 / 2</span>
                  </div>
                  <div class="inline-slide-indicators" id="upload-s3-4-indicators"></div>
                </div>
              </div>

              <script>
                initInlineSlideshow('upload-s3-4', {
                  folder: 'images/06/handson',
                  prefix: 'upload-s3-4',
                  pageCount: 2,
                  imgId: 'upload-s3-4-slide-img',
                  counterId: 'upload-s3-4-counter',
                  indicatorsId: 'upload-s3-4-indicators'
                });
              </script>
            </div>
          </div>

          <!-- ファイルへのアクセス -->
          <h3 class="section-subtitle">ファイルのアクセス</h3>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">1</span>
              <span class="step-title">テスト画像のダウンロード</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph">アップロードした <code>test-image.png</code> のファイル名をクリックし、詳細画面を開きます。</p>

              <!-- S3バケットアクセス手順1 スライドショー -->
              <div class="inline-slideshow" id="access-s3-1-slideshow">
                <div class="inline-slideshow-header">
                  <p class="inline-slideshow-title">&#128196; 画面例</p>
                </div>
                <div class="inline-slideshow-body">
                  <div class="inline-slide-area">
                    <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="access-s3-1" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                    <div class="inline-slide-image-wrapper">
                      <img class="inline-slide-image" id="access-s3-1-slide-img" src="images/06/handson/access-s3-1.png" alt="S3バケットアクセス手順1 1 / 1">
                    </div>
                    <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="access-s3-1" data-dir="next" aria-label="次のスライド">&#10095;</button>
                  </div>
                  <div class="inline-slide-counter-area">
                    <span class="inline-slide-counter" id="access-s3-1-counter">1 / 1</span>
                  </div>
                  <div class="inline-slide-indicators" id="access-s3-1-indicators"></div>
                </div>
              </div>

              <script>
                initInlineSlideshow('access-s3-1', {
                  folder: 'images/06/handson',
                  prefix: 'access-s3-1',
                  pageCount: 1,
                  imgId: 'access-s3-1-slide-img',
                  counterId: 'access-s3-1-counter',
                  indicatorsId: 'access-s3-1-indicators'
                });
              </script>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">2</span>
              <span class="step-title">画像を開く</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph">画面右上にある 「開く」 ボタンをクリックします。<br>
              画像が表示されることを確認します。</p>

              <!-- S3バケットアクセス手順2 スライドショー -->
              <div class="inline-slideshow" id="access-s3-2-slideshow">
                <div class="inline-slideshow-header">
                  <p class="inline-slideshow-title">&#128196; 画面例</p>
                </div>
                <div class="inline-slideshow-body">
                  <div class="inline-slide-area">
                    <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="access-s3-2" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                    <div class="inline-slide-image-wrapper">
                      <img class="inline-slide-image" id="access-s3-2-slide-img" src="images/06/handson/access-s3-2.png" alt="S3バケットアクセス手順2 1 / 2">
                    </div>
                    <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="access-s3-2" data-dir="next" aria-label="次のスライド">&#10095;</button>
                  </div>
                  <div class="inline-slide-counter-area">
                    <span class="inline-slide-counter" id="access-s3-2-counter">1 / 2</span>
                  </div>
                  <div class="inline-slide-indicators" id="access-s3-2-indicators"></div>
                </div>
              </div>

              <script>
                initInlineSlideshow('access-s3-2', {
                  folder: 'images/06/handson',
                  prefix: 'access-s3-2',
                  pageCount: 2,
                  imgId: 'access-s3-2-slide-img',
                  counterId: 'access-s3-2-counter',
                  indicatorsId: 'access-s3-2-indicators'
                });
              </script>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">3</span>
              <span class="step-title">外部からのアクセスを試みる</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph">プロパティ内にある 「オブジェクト URL」 （https://... で始まるURL）をクリックして開きます。</p>
              <p class="text-paragraph">ブラウザに <code>AccessDenied</code>（アクセス拒否）という文字が表示されます。</p>

              <!-- アクセス拒否の理由とロック解除方法についてのコラム -->
              <div class="info-box" style="margin: 24px 0;">
                <div class="info-box-title">&#128161; コラム：なぜアクセスできないのか？</div>
                <p class="text-paragraph" style="margin-bottom: 12px;">S3はデフォルトでURLを知っていてもアクセスできないようになっています。</p>
                <p class="text-paragraph" style="margin-bottom: 8px;">外部からアクセス可能にするためには、以下の2つのロックを解除する必要があります。</p>
                <ul>
                  <li><strong>ロック解除 1：</strong>バケット全体の「ブロック」を外す</li>
                  <li><strong>ロック解除 2：</strong>バケットポリシー（許可証）を書く</li>
                </ul>
              </div>

              <!-- S3バケットアクセス手順3 スライドショー -->
              <div class="inline-slideshow" id="access-s3-3-slideshow">
                <div class="inline-slideshow-header">
                  <p class="inline-slideshow-title">&#128196; 画面例</p>
                </div>
                <div class="inline-slideshow-body">
                  <div class="inline-slide-area">
                    <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="access-s3-3" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                    <div class="inline-slide-image-wrapper">
                      <img class="inline-slide-image" id="access-s3-3-slide-img" src="images/06/handson/access-s3-3.png" alt="S3バケットアクセス手順3 1 / 2">
                    </div>
                    <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="access-s3-3" data-dir="next" aria-label="次のスライド">&#10095;</button>
                  </div>
                  <div class="inline-slide-counter-area">
                    <span class="inline-slide-counter" id="access-s3-3-counter">1 / 2</span>
                  </div>
                  <div class="inline-slide-indicators" id="access-s3-2-indicators"></div>
                </div>
              </div>

              <script>
                initInlineSlideshow('access-s3-3', {
                  folder: 'images/06/handson',
                  prefix: 'access-s3-3',
                  pageCount: 2,
                  imgId: 'access-s3-3-slide-img',
                  counterId: 'access-s3-3-counter',
                  indicatorsId: 'access-s3-3-indicators'
                });
              </script>

              <!-- アクセス全体像 スライドショー -->
              <div class="inline-slideshow" id="access-s3-all-slideshow">
                <div class="inline-slideshow-header">
                  <p class="inline-slideshow-title">アクセス全体像</p>
                </div>
                <div class="inline-slideshow-body">
                  <div class="inline-slide-area">
                    <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="access-s3-all" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                    <div class="inline-slide-image-wrapper">
                      <img class="inline-slide-image" id="access-s3-all-slide-img" src="images/06/handson/access-s3-all01.png" alt="アクセス全体像">
                    </div>
                    <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="access-s3-all" data-dir="next" aria-label="次のスライド">&#10095;</button>
                  </div>
                  <div class="inline-slide-counter-area">
                    <span class="inline-slide-counter" id="access-s3-all-counter">1 / 2</span>
                  </div>
                  <div class="inline-slide-indicators" id="access-s3-all-indicators"></div>
                </div>
              </div>

              <script>
                initInlineSlideshow('access-s3-all', {
                  folder: 'images/06/handson',
                  prefix: 'access-s3-all',
                  pageCount: 2,
                  imgId: 'access-s3-all-slide-img',
                  counterId: 'access-s3-all-counter',
                  indicatorsId: 'access-s3-all-indicators'
                });
              </script>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">4</span>
              <span class="step-title">アクセス許可画面を開く</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph">自分のバケットのトップ画面に戻り、<strong>「アクセス許可」</strong>タブを開きます。</p>

              <!-- S3バケットアクセス手順4 スライドショー -->
              <div class="inline-slideshow" id="access-s3-4-slideshow">
                <div class="inline-slideshow-header">
                  <p class="inline-slideshow-title">&#128196; 画面例</p>
                </div>
                <div class="inline-slideshow-body">
                  <div class="inline-slide-area">
                    <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="access-s3-4" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                    <div class="inline-slide-image-wrapper">
                      <img class="inline-slide-image" id="access-s3-4-slide-img" src="images/06/handson/access-s3-4.png" alt="S3バケットアクセス手順4 1 / 2">
                    </div>
                    <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="access-s3-4" data-dir="next" aria-label="次のスライド">&#10095;</button>
                  </div>
                  <div class="inline-slide-counter-area">
                    <span class="inline-slide-counter" id="access-s3-4-counter">1 / 2</span>
                  </div>
                  <div class="inline-slide-indicators" id="access-s3-4-indicators"></div>
                </div>
              </div>

              <script>
                initInlineSlideshow('access-s3-4', {
                  folder: 'images/06/handson',
                  prefix: 'access-s3-4',
                  pageCount: 2,
                  imgId: 'access-s3-4-slide-img',
                  counterId: 'access-s3-4-counter',
                  indicatorsId: 'access-s3-4-indicators'
                });
              </script>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">5</span>
              <span class="step-title">バケット設定の編集画面を開く</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph">「ブロックパブリックアクセス (バケット設定)」の右側にある 「編集」 をクリックします。</p>

              <!-- S3バケットアクセス手順5 スライドショー -->
              <div class="inline-slideshow" id="access-s3-5-slideshow">
                <div class="inline-slideshow-header">
                  <p class="inline-slideshow-title">&#128196; 画面例</p>
                </div>
                <div class="inline-slideshow-body">
                  <div class="inline-slide-area">
                    <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="access-s3-5" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                    <div class="inline-slide-image-wrapper">
                      <img class="inline-slide-image" id="access-s3-5-slide-img" src="images/06/handson/access-s3-5.png" alt="S3バケットアクセス手順5 1 / 1">
                    </div>
                    <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="access-s3-5" data-dir="next" aria-label="次のスライド">&#10095;</button>
                  </div>
                  <div class="inline-slide-counter-area">
                    <span class="inline-slide-counter" id="access-s3-5-counter">1 / 1</span>
                  </div>
                  <div class="inline-slide-indicators" id="access-s3-5-indicators"></div>
                </div>
              </div>

              <script>
                initInlineSlideshow('access-s3-5', {
                  folder: 'images/06/handson',
                  prefix: 'access-s3-5',
                  pageCount: 1,
                  imgId: 'access-s3-5-slide-img',
                  counterId: 'access-s3-5-counter',
                  indicatorsId: 'access-s3-5-indicators'
                });
              </script>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">6</span>
              <span class="step-title">バケットのブロックを外す</span>
            </div>
            <div class="step-content">
                <p class="text-paragraph">「パブリックアクセスをすべてブロック」のチェックを外します。<br>
                「変更の保存」をクリックし、確認画面で <code>確認</code> と入力して保存します。</p>

                <!-- S3バケットアクセス手順6 スライドショー -->
                <div class="inline-slideshow" id="access-s3-6-slideshow">
                  <div class="inline-slideshow-header">
                    <p class="inline-slideshow-title">&#128196; 画面例</p>
                  </div>
                  <div class="inline-slideshow-body">
                    <div class="inline-slide-area">
                      <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="access-s3-6" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                      <div class="inline-slide-image-wrapper">
                        <img class="inline-slide-image" id="access-s3-6-slide-img" src="images/06/handson/access-s3-6.png" alt="S3バケットアクセス手順6 1 / 2">
                      </div>
                      <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="access-s3-6" data-dir="next" aria-label="次のスライド">&#10095;</button>
                    </div>
                    <div class="inline-slide-counter-area">
                      <span class="inline-slide-counter" id="access-s3-6-counter">1 / 2</span>
                    </div>
                    <div class="inline-slide-indicators" id="access-s3-6-indicators"></div>
                  </div>
                </div>

                <script>
                  initInlineSlideshow('access-s3-6', {
                    folder: 'images/06/handson',
                    prefix: 'access-s3-6',
                    pageCount: 2,
                    imgId: 'access-s3-6-slide-img',
                    counterId: 'access-s3-6-counter',
                    indicatorsId: 'access-s3-6-indicators'
                  });
                </script>
              </div>
            </div>

            <div class="step-container">
              <div class="step-header">
                <span class="step-number">7</span>
                <span class="step-title">バケットポリシーの編集画面を開く</span>
              </div>
              <div class="step-content">
                <p class="text-paragraph">同じ「アクセス許可」タブを少し下にスクロールし、「バケットポリシー」の 「編集」 をクリックします。</p>

                <!-- S3バケットアクセス手順7 スライドショー -->
                <div class="inline-slideshow" id="access-s3-7-slideshow">
                  <div class="inline-slideshow-header">
                    <p class="inline-slideshow-title">&#128196; 画面例</p>
                  </div>
                  <div class="inline-slideshow-body">
                    <div class="inline-slide-area">
                      <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="access-s3-7" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                      <div class="inline-slide-image-wrapper">
                        <img class="inline-slide-image" id="access-s3-7-slide-img" src="images/06/handson/access-s3-7.png" alt="S3バケットアクセス手順7 1 / 1">
                      </div>
                      <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="access-s3-7" data-dir="next" aria-label="次のスライド">&#10095;</button>
                    </div>
                    <div class="inline-slide-counter-area">
                      <span class="inline-slide-counter" id="access-s3-7-counter">1 / 1</span>
                    </div>
                    <div class="inline-slide-indicators" id="access-s3-7-indicators"></div>
                  </div>
                </div>

                <script>
                  initInlineSlideshow('access-s3-7', {
                    folder: 'images/06/handson',
                    prefix: 'access-s3-7',
                    pageCount: 1,
                    imgId: 'access-s3-7-slide-img',
                    counterId: 'access-s3-7-counter',
                    indicatorsId: 'access-s3-7-indicators'
                  });
                </script>
              </div>
            </div>

            <div class="step-container">
              <div class="step-header">
                <span class="step-number">8</span>
                <span class="step-title">バケットポリシー（許可証）を記述する</span>
              </div>
              <div class="step-content">
                <p class="text-paragraph">ポリシーに以下のJSON（許可証）をコピーして貼り付けます。<br>
                <small><code>s3-handson-YYYYMMDD-XX</code> の部分を、先ほど作成したバケット名に書き換えてください。</small></p>
                <div class="code-block"><button class="copy-btn" onclick="copyCode(this)">コピー</button>{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::s3-handson-YYYYMMDD-XX/*"
        }
    ]
}</div>

                <!-- バケットポリシー設定の解説ブロック -->
                <div class="info-box" style="margin: 24px 0;">
                  <div class="info-box-title">&#128161; ポリシー設定の解説</div>
                  <ul class="feature-list">
                    <li><strong>Version:</strong> ポリシーのバージョン（通常は"2012-10-17"のまま）</li>
                    <li><strong>Effect:</strong> "Allow"（許可）か "Deny"（拒否）か</li>
                    <li><strong>Principal:</strong> 誰に許可するか。「*」は世界中の全員（パブリック）</li>
                    <li><strong>Action:</strong> どのような操作を許可するか。「s3:GetObject」はファイルの読み取り（ダウンロード・表示）</li>
                    <li><strong>Resource:</strong> 操作を許可する対象。「:::バケット名/*」でバケット内の全ファイルを指定</li>
                  </ul>
                </div>

                <p class="text-paragraph">右下の 「変更の保存」 をクリックします。</p>

                <!-- S3バケットアクセス手順8 スライドショー -->
                <div class="inline-slideshow" id="access-s3-8-slideshow">
                  <div class="inline-slideshow-header">
                    <p class="inline-slideshow-title">&#128196; 画面例</p>
                  </div>
                  <div class="inline-slideshow-body">
                    <div class="inline-slide-area">
                      <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="access-s3-8" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                      <div class="inline-slide-image-wrapper">
                        <img class="inline-slide-image" id="access-s3-8-slide-img" src="images/06/handson/access-s3-8.png" alt="S3バケットアクセス手順8 1 / 3">
                      </div>
                      <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="access-s3-8" data-dir="next" aria-label="次のスライド">&#10095;</button>
                    </div>
                    <div class="inline-slide-counter-area">
                      <span class="inline-slide-counter" id="access-s3-8-counter">1 / 3</span>
                    </div>
                    <div class="inline-slide-indicators" id="access-s3-8-indicators"></div>
                  </div>
                </div>

                <script>
                  initInlineSlideshow('access-s3-8', {
                    folder: 'images/06/handson',
                    prefix: 'access-s3-8',
                    pageCount: 3,
                    imgId: 'access-s3-8-slide-img',
                    counterId: 'access-s3-8-counter',
                    indicatorsId: 'access-s3-8-indicators'
                  });
                </script>
              </div>
            </div>
        
            <div class="step-container">
              <div class="step-header">
                <span class="step-number">9</span>
                <span class="step-title">外部からのアクセスを確認する</span>
              </div>
              <div class="step-content">
                <p class="text-paragraph">再び <code>test-image.png</code> の詳細画面を開きます。<br>
                フェーズ1でエラーになった 「オブジェクト URL」 をもう一度クリックします。<br>
                今度は画像が表示されるはずです。</p>
                
                <!-- S3バケットアクセス手順9 スライドショー -->
                <div class="inline-slideshow" id="access-s3-9-slideshow">
                  <div class="inline-slideshow-header">
                    <p class="inline-slideshow-title">&#128196; 画面例</p>
                  </div>
                  <div class="inline-slideshow-body">
                    <div class="inline-slide-area">
                      <button class="inline-slide-arrow inline-slide-arrow-left" data-slideshow="access-s3-9" data-dir="prev" aria-label="前のスライド">&#10094;</button>
                      <div class="inline-slide-image-wrapper">
                        <img class="inline-slide-image" id="access-s3-9-slide-img" src="images/06/handson/access-s3-9.png" alt="S3バケットアクセス手順9 1 / 3">
                      </div>
                      <button class="inline-slide-arrow inline-slide-arrow-right" data-slideshow="access-s3-9" data-dir="next" aria-label="次のスライド">&#10095;</button>
                    </div>
                    <div class="inline-slide-counter-area">
                      <span class="inline-slide-counter" id="access-s3-9-counter">1 / 3</span>
                    </div>
                    <div class="inline-slide-indicators" id="access-s3-9-indicators"></div>
                  </div>
                </div>

                <script>
                  initInlineSlideshow('access-s3-9', {
                    folder: 'images/06/handson',
                    prefix: 'access-s3-9',
                    pageCount: 3,
                    imgId: 'access-s3-9-slide-img',
                    counterId: 'access-s3-9-counter',
                    indicatorsId: 'access-s3-9-indicators'
                  });
                </script>
              </div>
            </div>
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
    }
  ]
};
