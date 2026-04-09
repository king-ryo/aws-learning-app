// ========================================
// 第7章: コンテナレジストリ（ECR）
// ========================================
const chapter07 = {
  id: 7,
  title: "コンテナレジストリ（ECR）",
  sections: [
    {
      id: "7-intro",
      title: "この章で学ぶこと",
      type: "explanation",
      content: `
        <div class="chapter-container">
          <div class="chapter-intro-banner">
            <div class="chapter-number">CHAPTER 07</div>
            <h1 class="chapter-main-title">コンテナレジストリ（ECR）</h1>
            <p class="chapter-subtitle">コンテナイメージを安全に保存・管理しよう</p>
          </div>

          <div class="learning-goals">
            <h3 class="learning-goals-title">&#127919; この章の学習目標</h3>
            <ul class="learning-goals-list">
                <li>ECRとは何か、何のために使うのかを理解する</li>
                <li>コンテナイメージ、リポジトリ、レジストリの関係を説明できる</li>
                <li>ECRのセキュリティ機能（脆弱性スキャンなど）を理解する</li>
                <li>ライフサイクルポリシーによるコスト最適化を知る</li>
            </ul>
          </div>

          <h2 class="section-title">&#128218; はじめに</h2>

          <p class="text-paragraph">
            近年、アプリケーションを「コンテナ」という軽量な仮想環境にパッケージングして動かす技術（Dockerなど）が主流になっています。
            この章では、作成したコンテナの設計図である「コンテナイメージ」をAWS上で安全に保管・管理するためのサービス、<strong>Amazon ECR（Elastic Container Registry）</strong>について学びます。
          </p>

          <div class="info-box">
            <div class="info-box-title">&#128161; EC2やS3との関連性</div>
            <p>
              S3が「あらゆるファイルの保管庫」なら、ECRは<strong>「コンテナイメージ専用の保管庫」</strong>です。ここで保管したイメージを使って、EC2などのコンピューティング環境で実際のアプリケーション（コンテナ）を起動します。
            </p>
          </div>
        </div>
      `
    },
    {
      id: "7-1",
      title: "ECRとは",
      type: "explanation",
      content: `
        <div class="chapter-container">
          <h2 class="section-title">7.1 ECRとは</h2>

          <p class="text-paragraph">
            <strong>Amazon ECR</strong> は、AWSが提供するフルマネージド型のコンテナイメージレジストリサービスです。開発者がDockerコンテナイメージを安全に保存、管理、デプロイすることを簡単にします。
          </p>

          <div class="term-box">
            <div class="term-box-title">&#128161; 「コンテナイメージレジストリ」とは？</div>
            <p>コンテナを実行するためには、OSの環境やアプリケーションのコード、必要なライブラリをひとまとめにした「コンテナイメージ」が必要です。この<strong>コンテナイメージをネットワーク上で保管・共有するための専用の倉庫</strong>を「コンテナイメージレジストリ」と呼びます。<br>
            一般公開されている代表的なものに「Docker Hub」がありますが、ECRは企業が自社専用（プライベート）で安全に使える<strong>「AWS版のセキュアなDocker Hub」</strong>と言えます。</p>
          </div>

          <div class="info-box">
            <div class="info-box-title">&#128161; コンテナとEC2（仮想サーバー）の違い</div>
            <p>コンテナとEC2は、どちらもWebサイトやシステムなどのアプリケーションを動かすための「仮想環境」を提供します。<br>
            しかし、コンテナはOSの土台（カーネル）を共有し、アプリと必要な設定だけを切り出している点が異なります。そのため、開発環境をそのまま本番環境へ移行しやすく、OSの起動プロセスが不要なため軽量で素早く起動できるという特徴があります。</p>
          </div>

          <h3 class="section-subtitle">従来方式（EC2上での自前構築）との比較</h3>
          <p>ECRのようなマネージドサービスを使わない場合、以下のような運用を自前で行う必要があり、非常に手間がかかります。</p>
          <div class="comparison-container">
            <div class="comparison-grid">
              <div class="comparison-item">
                <h4>EC2上に自前でレジストリを構築する場合</h4>
                <div class="comparison-content">
                  <ul>
                      <li>EC2インスタンスを起動し、Docker Registryソフトウェアをインストール・設定する。</li>
                      <li>ストレージ（EBSやS3）をマウントして容量不足を監視する。</li>
                      <li>通信を暗号化するためのSSL/TLS証明書を管理する。</li>
                      <li>サーバーOSやソフトウェアのセキュリティパッチを定期的に適用する。</li>
                  </ul>
                </div>
              </div>
              <div class="comparison-item highlight">
                <h4>ECR（マネージド）を利用する場合</h4>
                <div class="comparison-content">
                  <ul>
                      <li>サーバーの構築やOSの管理は<strong>一切不要</strong>。</li>
                      <li>ストレージ容量は自動でスケールし、パッチ適用もAWSが裏側で行うため、開発者はイメージの保存・管理にのみ集中できます。</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="point-box">
            <div class="point-box-title">&#128202; ECRの特徴まとめ</div>
            <table class="info-table">
              <tr>
                <th>特徴</th>
                <th>説明</th>
              </tr>
              <tr>
                <td><strong>フルマネージド</strong></td>
                <td>サーバーやストレージのインフラ管理が不要。容量も自動で拡張されます。</td>
              </tr>
              <tr>
                <td><strong>高耐久・高可用性</strong></td>
                <td>バックエンドのストレージに <strong>S3</strong> を使用しており、99.999999999%の耐久性を誇ります。</td>
              </tr>
              <tr>
                <td><strong>強固なセキュリティ</strong></td>
                <td><strong>IAM</strong> と連携した細かいアクセス制御、保存時の自動暗号化、脆弱性スキャン機能を備えています。</td>
              </tr>
              <tr>
                <td><strong>他サービスとの連携</strong></td>
                <td>EC2などのコンピューティング環境からシームレスにイメージを取得（Pull）できます。</td>
              </tr>
            </table>
          </div>

          <div class="inline-slideshow">
            <div class="inline-slideshow-header">
              <span class="inline-slideshow-title">&#128451; ECRの概要図解</span>
            </div>
            <div class="inline-slideshow-body">
              <div class="inline-slide-area">
                <button class="inline-slide-arrow" data-slideshow="ecroverview" data-dir="prev" disabled>&#10094;</button>
                <div class="inline-slide-image-wrapper">
                  <img id="ecroverview-slide-img" class="inline-slide-image" src="images/07/ecr-01.png" alt="ECR 1 / 3">
                </div>
                <button class="inline-slide-arrow" data-slideshow="ecroverview" data-dir="next">&#10095;</button>
              </div>
              <div class="inline-slide-counter-area">
                <span id="ecroverview-slide-counter" class="inline-slide-counter">1 / 3</span>
              </div>
              <div id="ecroverview-slide-indicators" class="inline-slide-indicators"></div>
            </div>
          </div>
          <script>
            initInlineSlideshow('ecroverview', {
              imgId: 'ecroverview-slide-img',
              counterId: 'ecroverview-slide-counter',
              indicatorsId: 'ecroverview-slide-indicators',
              folder: 'images/07',
              prefix: 'ecr-',
              pageCount: 5
            });
          </script>

        </div>
      `
    },
    {
      id: "7-2",
      title: "ECRの主要な構成要素",
      type: "explanation",
      content: `
        <div class="chapter-container">
          <h2 class="section-title">7.2 ECRの主要な構成要素</h2>

          <p class="text-paragraph">
            ECRを利用する上で、以下の3つの階層構造を理解することが重要です。
          </p>

          <div class="point-box">
            <div class="point-box-title">1. レジストリ (Registry)</div>
            <p>AWSアカウントの各リージョンに対して、デフォルトで1つ提供される<strong>「一番大きな保管庫（大枠）」</strong>です。</p>
            <ul>
                <li><code>123456789012.dkr.ecr.ap-northeast-1.amazonaws.com</code> のような専用のURLが割り当てられます。</li>
            </ul>
          </div>

          <div class="point-box">
            <div class="point-box-title">2. リポジトリ (Repository)</div>
            <p>レジストリの中に作成する、<strong>「アプリケーションごとのフォルダ」</strong>のようなものです。</p>
            <ul>
                <li>例：<code>web-app</code> 用のリポジトリ、<code>api-server</code> 用のリポジトリなど、プロジェクトや役割ごとに作成します。</li>
            </ul>
          </div>

          <div class="point-box">
            <div class="point-box-title">3. イメージ (Image) と タグ (Tag)</div>
            <p>リポジトリ内に保存される<strong>「実際のデータ（コンテナの設計図）」</strong>です。<br>
            1つのリポジトリには複数のイメージを保存でき、それぞれを区別するために「タグ」を付けます。</p>
            <ul>
                <li>例：<code>web-app:latest</code>（最新版）、<code>web-app:v1.0.0</code>（バージョン1.0.0）など。</li>
            </ul>
          </div>

          <div style="text-align: center; margin: var(--space-lg) 0;">
            <img src="images/07/structure.png" alt="ECRの階層構成" style="max-width: 100%; height: auto; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
          </div>

          <h3 class="section-subtitle">&#127183; プライベートとパブリック（レジストリの種類）</h3>
          <p class="text-paragraph">
            ECRには、用途に合わせて<strong>「プライベート」</strong>と<strong>「パブリック」</strong>の2種類のレジストリが存在します。用途によって使い分けます。
          </p>

          <div class="comparison-container">
            <div class="comparison-grid">
              <div class="comparison-item highlight">
                <h4>プライベートレジストリ（基本）</h4>
                <div class="comparison-content">
                  <ul>
                      <li><strong>特徴:</strong> デフォルトの設定です。IAMによる認証が必須となります。</li>
                      <li><strong>アクセス:</strong> 許可されたAWSアカウント内のユーザーやサービス（ECSやEC2など）だけがアクセス（Pull/Push）できます。</li>
                      <li><strong>用途:</strong> 社内システムや自社商用サービスのコンテナイメージを、外部に漏らさず安全に保管するために使います。</li>
                  </ul>
                </div>
              </div>
              <div class="comparison-item">
                <h4>パブリックレジストリ（Amazon ECR Public）</h4>
                <div class="comparison-content">
                  <ul>
                      <li><strong>特徴:</strong> インターネット上に公開されるレジストリです。</li>
                      <li><strong>アクセス:</strong> 誰でも<strong>認証なし</strong>でイメージをPull（ダウンロード）できます（※Pushには権限が必要です）。</li>
                      <li><strong>用途:</strong> オープンソースソフトウェアや、一般向けに広く配布したいコンテナイメージを置くために使います。「ECR Public Gallery」という公開サイトにカタログとして掲載することも可能です。</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="info-box">
            <div class="info-box-title">&#128161; ポイント</div>
            <p>基本的にはセキュリティを担保するために<strong>「プライベート」</strong>を使用します。独自のツールを世界中に公開したいといった特別な理由がない限り、パブリックを使用する必要はありません。</p>
          </div>
          
          <div style="text-align: center; margin: var(--space-lg) 0;">
            <img src="images/07/private_public.png" alt="プライベートとパブリックの違い" style="max-width: 100%; height: auto; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
          </div>
        </div>
      `
    },
    {
      id: "7-3",
      title: "セキュリティと便利機能",
      type: "explanation",
      content: `
        <div class="chapter-container">
          <h2 class="section-title">7.3 セキュリティと便利機能</h2>

          <p class="text-paragraph">
            ECRは、企業が本番環境で安心して使えるよう、強力なセキュリティと運用補助機能を持っています。
          </p>

          <div class="term-box">
            <div class="term-box-title">&#128680; 強固なアクセス制御（IAM連携）</div>
            <p>ECRは、第2章で学んだ <strong>IAM (Identity and Access Management)</strong> と完全に統合されています。<br>
            デフォルトではすべてのリポジトリがプライベート（非公開）になっており、「誰がPush（書き込み）できるか」「どのサーバーがPull（読み取り）できるか」をIAMポリシーで細かく制御できます。</p>
            <div style="text-align: center; margin: var(--space-lg) 0;">
              <img src="images/07/iam.png" alt="IAM連携" style="max-width: 100%; height: auto; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
            </div>
          </div>

          <div class="term-box">
            <div class="term-box-title">&#128269; 脆弱性スキャン (Image Scanning)</div>
            <p>Pushされたコンテナイメージの中に、既知のセキュリティの欠陥（古いOSの脆弱性や危険なライブラリなど）が含まれていないかを<strong>自動的にスキャン（検査）</strong>する機能があります。</p>
            <ul>
                <li><strong>Push時のスキャン：</strong> イメージをアップロードした瞬間に自動チェックする設定が可能です。</li>
            </ul>
          </div>

          <div class="term-box">
            <div class="term-box-title">&#9851; ライフサイクルポリシー</div>
            <p>コンテナイメージは開発を進めるごとにどんどん溜まっていき、放置するとストレージ料金（S3と同じ従量課金）が膨らんでしまいます。<br>
            <strong>ライフサイクルポリシー</strong>を設定すると、「タグがついていない古いイメージは14日後に削除する」「最新の30個だけを残して後は削除する」といった<strong>自動お掃除ルール</strong>を適用でき、コストを最適化できます。</p>
          </div>
        </div>
      `
    },
    {
      id: "7-4",
      title: "イメージをアップロード（Push）して実行環境で利用する流れ",
      type: "explanation",
      content: `
        <div class="chapter-container">
          <h2 class="section-title">7.4 イメージをアップロード（Push）して実行環境で利用する流れ</h2>

          <p class="text-paragraph">
            ECRにコンテナイメージを保存（Push）し、それをEC2などの実行環境で利用するには、手元のパソコンやサーバー上で「AWS CLI」と「Docker」のコマンドを組み合わせて操作します。<br>
            具体的なコマンド操作を含むハンズオンは別途実践しますが、ここではコンテナイメージがAWSにアップロードされ、実際のサーバー上でアプリケーションとして起動するまでの全体的な「流れ（ロードマップ）」を把握しておきましょう。
          </p>

          <div style="background: var(--primary-bg); border: 1px solid var(--primary-light); border-radius: var(--radius-xl); padding: 32px; margin: 40px 0; box-shadow: var(--shadow-sm);">
            <h3 style="text-align: center; font-size: 24px; color: var(--primary-dark); font-weight: 700; margin-top: 0; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 2px dashed rgba(255, 153, 0, 0.3); display: flex; align-items: center; justify-content: center; gap: 10px;">
              <span style="font-size: 28px;">&#128640;</span> 利用までのロードマップ
            </h3>
            <div style="text-align: center; margin: var(--space-lg) 0;">
              <img src="images/07/ecr_roadmap.png" alt="ECRロードマップ" style="max-width: 100%; height: auto; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
            </div>
            <div style="display: flex; flex-direction: column; gap: 16px;">
            
            <div class="card" style="margin: 0; padding: 24px; border-top: 4px solid var(--accent-blue); display: flex; flex-direction: column;">
              <div class="step-header" style="margin-bottom: 16px;">
                <div class="step-number" style="background: var(--accent-blue);">1</div>
                <div style="font-size: 18px; font-weight: 700; color: var(--text-primary); line-height: 1.4;">ECRへのログイン（認証）</div>
              </div>
              <div style="padding-left: 0; color: var(--text-secondary); font-size: 15px; line-height: 1.7;">
                <p>まずは、手元のDocker環境に対して「これから通信するAWSアカウントの正規ユーザーである」ことを証明する必要があります。<br>
                AWS CLIを使ってECRの認証トークン（一時的なパスワード）を取得し、Dockerクライアントにログインします。これにより、安全にイメージを送信する準備が整います。</p>
              </div>
            </div>

            <div style="text-align: center; color: var(--text-muted); font-size: 24px;">&#9660;</div>

            <div class="card" style="margin: 0; padding: 24px; border-top: 4px solid var(--accent-blue); display: flex; flex-direction: column;">
              <div class="step-header" style="margin-bottom: 16px;">
                <div class="step-number" style="background: var(--accent-blue);">2</div>
                <div style="font-size: 18px; font-weight: 700; color: var(--text-primary); line-height: 1.4;">リポジトリの作成</div>
              </div>
              <div style="padding-left: 0; color: var(--text-secondary); font-size: 15px; line-height: 1.7;">
                <p>イメージの保存先となる「リポジトリ」をECR上に作成します（すでにAWSマネジメントコンソール等で作成済みの場合はスキップします）。<br>
                プロジェクトやアプリケーションごとに、例えば <code>my-web-app</code> といった専用の保管フォルダを作るイメージです。</p>
              </div>
            </div>

            <div style="text-align: center; color: var(--text-muted); font-size: 24px;">&#9660;</div>

            <div class="card" style="margin: 0; padding: 24px; border-top: 4px solid var(--primary-color); display: flex; flex-direction: column;">
              <div class="step-header" style="margin-bottom: 16px;">
                <div class="step-number">3</div>
                <div style="font-size: 18px; font-weight: 700; color: var(--text-primary); line-height: 1.4;">コンテナイメージのビルド（作成）</div>
              </div>
              <div style="padding-left: 0; color: var(--text-secondary); font-size: 15px; line-height: 1.7;">
                <p>手元の環境で、アプリケーションの構成や必要なライブラリを記述した設計図（<code>Dockerfile</code>）をもとに、コンテナイメージをビルド（組み立て）します。<br>
                この時点では、出来上がったイメージはまだ自分のパソコン（ローカル環境）の中にしかありません。</p>
              </div>
            </div>

            <div style="text-align: center; color: var(--text-muted); font-size: 24px;">&#9660;</div>

            <div class="card" style="margin: 0; padding: 24px; border-top: 4px solid var(--primary-color); display: flex; flex-direction: column;">
              <div class="step-header" style="margin-bottom: 16px;">
                <div class="step-number">4</div>
                <div style="font-size: 18px; font-weight: 700; color: var(--text-primary); line-height: 1.4;">イメージへのタグ付け（宛先指定）</div>
              </div>
              <div style="padding-left: 0; color: var(--text-secondary); font-size: 15px; line-height: 1.7;">
                <p>作成したローカルのイメージに対し、「これはAWS上の、どのECRレジストリ・リポジトリに送るものか」という<strong>宛先情報（URI）</strong>と<strong>バージョン</strong>を含んだ「タグ」を付けます。<br>
                （例：手元のイメージに <code style="word-break: break-all;">123456789012.dkr.ecr.ap-northeast-1.amazonaws.com/my-web-app:v1.0</code> のような長い名札を貼り付ける作業です）</p>
              </div>
            </div>

            <div style="text-align: center; color: var(--text-muted); font-size: 24px;">&#9660;</div>

            <div class="card" style="margin: 0; padding: 24px; border-top: 4px solid var(--primary-color); display: flex; flex-direction: column;">
              <div class="step-header" style="margin-bottom: 16px;">
                <div class="step-number">5</div>
                <div style="font-size: 18px; font-weight: 700; color: var(--text-primary); line-height: 1.4;">ECRへPush（アップロード）</div>
              </div>
              <div style="padding-left: 0; color: var(--text-secondary); font-size: 15px; line-height: 1.7;">
                <p>宛先が指定できたら、Push（アップロード）を実行します。<br>
                タグ付けされた情報をもとに、手元のイメージがネットワークを通ってAWS上のECRに安全に保存されます。 ここまでが「手元のパソコン」で行う作業です。</p>
              </div>
            </div>

            <div style="text-align: center; color: var(--text-muted); font-size: 24px;">&#9660;</div>

            <div class="card" style="margin: 0; padding: 24px; border-top: 4px solid var(--accent-blue); display: flex; flex-direction: column;">
              <div class="step-header" style="margin-bottom: 16px;">
                <div class="step-number" style="background: var(--accent-blue);">6</div>
                <div style="font-size: 18px; font-weight: 700; color: var(--text-primary); line-height: 1.4;">実行環境（EC2など）にアクセス権限を付与</div>
              </div>
              <div style="padding-left: 0; color: var(--text-secondary); font-size: 15px; line-height: 1.7;">
                <p>ここからはAWS側の作業です。ECRはデフォルトでプライベート（非公開）な保管庫なので、EC2などのサーバーが勝手にイメージを取り出すことはできません。<br>
                そこで、第2章で学んだIAMを利用し、EC2インスタンスに対して「ECRからイメージをPull（読み取り）してもよい」という権限を持つ「IAMロール」を割り当てます。</p>
              </div>
            </div>

            <div style="text-align: center; color: var(--text-muted); font-size: 24px;">&#9660;</div>

            <div class="card" style="margin: 0; padding: 24px; border-top: 4px solid var(--accent-blue); display: flex; flex-direction: column;">
              <div class="step-header" style="margin-bottom: 16px;">
                <div class="step-number" style="background: var(--accent-blue);">7</div>
                <div style="font-size: 18px; font-weight: 700; color: var(--text-primary); line-height: 1.4;">実行環境でイメージをPull（ダウンロード）して起動</div>
              </div>
              <div style="padding-left: 0; color: var(--text-secondary); font-size: 15px; line-height: 1.7;">
                <p>EC2のサーバーにSSH接続などで入り、Step 1と同様にECRへのログイン認証を行います。<br>
                その後、先ほどPushしたイメージのURIを指定して <code>docker pull</code>（ダウンロード）を実行します。最後に <code>docker run</code> コマンドを実行すれば、ECRに保管していたコンテナイメージをもとに、サーバー上でアプリケーションが稼働し始めます！</p>
              </div>
            </div>

            </div>
          </div>

          <div class="summary-box">
            <h3>第7章のまとめ</h3>
            <ul>
                <li><strong>ECR</strong>は、コンテナイメージを保存・管理するフルマネージドなレジストリサービス。</li>
                <li><strong>レジストリ ＞ リポジトリ ＞ イメージ（タグ）</strong> の階層構造で管理される。</li>
                <li>バックエンドはS3で動いており、高耐久・高可用性。</li>
                <li><strong>IAM連携</strong>でアクセス制御ができ、<strong>脆弱性スキャン</strong>で安全性を保てる。</li>
                <li><strong>ライフサイクルポリシー</strong>で古いイメージを自動削除し、コストを抑えるのがベストプラクティス。</li>
            </ul>
          </div>

          <div class="point-box" style="margin-top: 30px;">
            <div class="point-box-title">&#128214; AWS公式ドキュメント参照先</div>
            <ul class="feature-list">
                <li><a href="https://docs.aws.amazon.com/ja_jp/AmazonECR/latest/userguide/what-is-ecr.html" target="_blank" rel="noopener">Amazon ECR とは（User Guide）</a></li>
                <li><a href="https://aws.amazon.com/jp/ecr/pricing/" target="_blank" rel="noopener">Amazon ECR の料金</a></li>
                <li><a href="https://docs.aws.amazon.com/ja_jp/AmazonECR/latest/userguide/image-scanning.html" target="_blank" rel="noopener">イメージのスキャン（脆弱性スキャン）</a></li>
                <li><a href="https://docs.aws.amazon.com/ja_jp/AmazonECR/latest/userguide/LifecyclePolicies.html" target="_blank" rel="noopener">ライフサイクルポリシーを使用したイメージの自動クリーンアップ</a></li>
            </ul>
          </div>
        </div>
      `
    },
    // ハンズオン1: （準備）プロジェクト作成
    {
      id: "7-handson1",
      title: "ハンズオン1：（準備）プロジェクト作成",
      type: "explanation",
      content: `
        <div class="chapter-container">
          <h2 class="section-title">&#128736; ハンズオン1：（準備）プロジェクト作成</h2>
          
          <div class="point-box">
            <ul class="feature-list">
              <li><strong>操作場所：</strong> ローカル（Macのターミナル / エディタ）</li>
              <li><strong>ゴール：</strong> Docker化するためのReact（フロントエンド）とSpring Boot（バックエンド）のプロジェクトを作成する。</li>
            </ul>
          </div>

          <p class="text-paragraph">
            このステップでは、推奨されるフォルダ構成に沿って、React（フロントエンド）、Spring Boot（バックエンド）、およびMySQL（データベース）の土台を作り、それぞれが連携できるようにコードを記述していきます。
          </p>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">1</span>
              <span class="step-title">フォルダ構成のベースを作成する</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph">まずは、プロジェクト全体をまとめる親フォルダと、各機能ごとのサブフォルダを作成します。</p>
              <p class="text-paragraph">ターミナル（またはコマンドプロンプト）を開き、以下のコマンドを実行してください。</p>
              <div class="code-block"><button class="copy-btn" onclick="copyCode(this)">コピー</button># 親フォルダの作成と移動
mkdir myapp
cd myapp

# サブフォルダの作成
mkdir frontend backend deploy mysql</div>
              <p class="text-paragraph">これで、以下の構成ができます。</p>
              <div class="code-block"><button class="copy-btn" onclick="copyCode(this)">コピー</button>myapp/
 ├─ frontend/  (後でReactプロジェクトを作成)
 ├─ backend/   (後でSpring Bootプロジェクトを作成)
 ├─ deploy/    (Docker Compose用)
 └─ mysql/     (DB初期化用)</div>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">2</span>
              <span class="step-title">MySQL（データベース）の初期化SQLを作成する</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph">MySQLコンテナが起動した際に、自動でテーブル作成と初期データの投入が行われるように <code>init.sql</code> を準備します。</p>
              <p class="text-paragraph"><code>myapp/mysql/</code> フォルダ内に <code>init.sql</code> というファイルを作成し、以下の内容を記述して保存してください。</p>
              <div class="code-block"><button class="copy-btn" onclick="copyCode(this)">コピー</button>-- データベースの作成と選択
CREATE DATABASE IF NOT EXISTS sampledb;
USE sampledb;

-- テーブルの作成
CREATE TABLE IF NOT EXISTS messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    content VARCHAR(255) NOT NULL
);

-- 初期データの投入
INSERT INTO messages (content) VALUES ('Hello from MySQL!');
INSERT INTO messages (content) VALUES ('Spring Boot connection successful!');</div>
            </div>
          </div>

          <!-- Spring Boot（バックエンド）の作成 -->
          <h3 class="section-subtitle">Spring Boot（バックエンド）の作成</h3>
          <p class="text-paragraph">Spring Bootで、データベースからデータを取得してReactに返すAPI（<code>http://localhost:8080/api/messages</code>）を作成します。</p>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">1</span>
              <span class="step-title">プロジェクトの生成</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph"><a href="https://start.spring.io/" target="_blank" rel="noopener">Spring Initializr</a> にアクセスし、以下の設定でプロジェクトを生成します。</p>
              <ul class="feature-list">
                <li><strong>Project</strong>: Gradle</li>
                <li><strong>Language</strong>: Java</li>
                <li><strong>Spring Boot</strong>: 3.x.x または 4.x.x (最新の安定版)</li>
                <li><strong>Metadata</strong>:
                  <ul class="feature-list">
                    <li>Group: <code>com.example</code></li>
                    <li>Artifact: <code>backend</code></li>
                  </ul>
                </li>
                <li><strong>Packaging</strong>: Jar</li>
                <li><strong>Java</strong>: 21</li>
                <li><strong>Dependencies (依存関係)</strong>:
                  <ul>
                    <li>Spring Web (API作成用)</li>
                    <li>Spring Data JPA (データベース操作用)</li>
                    <li>MySQL Driver (MySQL接続用)</li>
                  </ul>
                </li>
              </ul>
              <p class="text-paragraph">生成されたZIPファイルをダウンロードして解凍し、中身をすべて先ほど作成した <code>myapp/backend/</code> フォルダ内に移動してください。</p>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">2</span>
              <span class="step-title">データベース接続設定 (application.properties)</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph"><code>backend/src/main/resources/application.properties</code> を開き、以下の内容を記述します。<br>ここでのポイントは、接続先を <code>localhost</code> ではなく、後ほどDocker Composeで定義するサービス名である <code>db</code> にすることです。</p>
              <div class="code-block"><button class="copy-btn" onclick="copyCode(this)">コピー</button># 接続先はコンテナのサービス名 'db' を指定
spring.datasource.url=jdbc:mysql://db:3306/sampledb
spring.datasource.username=root
spring.datasource.password=password

# Hibernateの設定（テーブルを自動更新）
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true</div>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">3</span>
              <span class="step-title">Javaコードの作成</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph"><code>backend/src/main/java/com/example/backend/</code> フォルダ配下に、以下の3つのファイルを作成（または追記）します。</p>
              
              <p class="text-paragraph"><strong>Entityクラス (データベースのテーブルと紐づくクラス)</strong></p>
              <div class="code-block"><button class="copy-btn" onclick="copyCode(this)">コピー</button>// Message.java
package com.example.backend;

import jakarta.persistence.*;

@Entity
@Table(name = "messages")
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String content;

    // Getter / Setter
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
}</div>

              <p class="text-paragraph"><strong>Repositoryインターフェース (データベース操作用)</strong></p>
              <div class="code-block"><button class="copy-btn" onclick="copyCode(this)">コピー</button>// MessageRepository.java
package com.example.backend;

import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository&lt;Message, Integer&gt; {
}</div>

              <p class="text-paragraph"><strong>Controllerクラス (APIの窓口)</strong></p>
              <div class="code-block"><button class="copy-btn" onclick="copyCode(this)">コピー</button>// MessageController.java
package com.example.backend;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api/messages")
@CrossOrigin(origins = "*") // Reactからのアクセスを許可
public class MessageController {

    private final MessageRepository repository;

    public MessageController(MessageRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List&lt;Message&gt; getMessages() {
        return repository.findAll();
    }
}</div>
            </div>
          </div>

          <!-- React（フロントエンド）の作成 -->
          <h3 class="section-subtitle">React（フロントエンド）の作成</h3>
          <p class="text-paragraph">Viteを使ってReactプロジェクトを作成し、Spring BootのAPIを呼び出して画面に表示する処理を書きます。</p>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">1</span>
              <span class="step-title">プロジェクトの生成</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph"><code>myapp/</code> フォルダにいる状態で、以下のコマンドを実行します。（すでに空の <code>frontend</code> フォルダがあるため、その中にViteのファイルを展開します）</p>
              <div class="code-block"><button class="copy-btn" onclick="copyCode(this)">コピー</button># frontendディレクトリの中身を作成
cd frontend
npm create vite@latest . -- --template react

# 依存パッケージのインストール
npm install</div>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">2</span>
              <span class="step-title">API呼び出し処理の追加 (App.jsx)</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph"><code>frontend/src/App.jsx</code> を開き、以下の内容に丸ごと書き換えます。<br>ブラウザからAPIを叩くため、アクセス先は <code>http://localhost:8080</code> となります。</p>
              <div class="code-block"><button class="copy-btn" onclick="copyCode(this)">コピー</button>import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() =&gt; {
    // Spring BootのAPIエンドポイントを呼び出す
    fetch('http://localhost:8080/api/messages')
      .then((res) =&gt; {
        if (!res.ok) throw new Error('ネットワークエラーが発生しました');
        return res.json();
      })
      .then((data) =&gt; setMessages(data))
      .catch((err) =&gt; setError(err.message));
  }, []);

  return (
    &lt;div className="App"&gt;
      &lt;h1&gt;React + Spring Boot + MySQL&lt;/h1&gt;
      &lt;h2&gt;メッセージリスト&lt;/h2&gt;
      {error && &lt;p style={{ color: 'red' }}&gt;エラー: {error}&lt;/p&gt;}
      &lt;ul&gt;
        {messages.map((msg) =&gt; (
          &lt;li key={msg.id}&gt;{msg.content}&lt;/li&gt;
        ))}
      &lt;/ul&gt;
    &lt;/div&gt;
  )
}

export default App</div>
            </div>
          </div>
        </div>
      `
    },
    // ハンズオン2: （準備）Dockerを使ってローカルで動作確認
    {
      id: "7-handson2",
      title: "ハンズオン2：（準備）Dockerを使ってローカルで動作確認",
      type: "explanation",
      content: `
        <div class="chapter-container">
          <h2 class="section-title">&#128736; ハンズオン2：（準備）Dockerを使ってローカルで動作確認</h2>
          
          <div class="point-box">
            <ul class="feature-list">
              <li><strong>操作場所：</strong> ローカル（Macのターミナル / エディタ）</li>
              <li><strong>ゴール：</strong> AWSにデプロイする前に、ローカル環境で3層構成が動くことを確認する。</li>
            </ul>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">1</span>
              <span class="step-title">React用のDockerfileを作成する</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph">Reactは開発用サーバーのまま公開するのではなく、buildした静的ファイルをNginxで配信する形がわかりやすいです。以下の手順で、Node.jsでbuildし、そのbuild結果をNginxコンテナにコピーする設定を書きます。</p>
              <p class="text-paragraph"><code>myapp/frontend/</code> フォルダ内に <code>Dockerfile</code>（拡張子なし）を作成し、以下の内容を記述します。</p>
              <div class="code-block"><button class="copy-btn" onclick="copyCode(this)">コピー</button># 1. ビルド環境 (Node.js)
FROM node:22 AS build
WORKDIR /app
# パッケージ情報を先にコピーしてインストール
COPY package*.json ./
RUN npm install
# ソースコードをコピーしてビルド
COPY . .
RUN npm run build

# 2. 実行環境 (Nginx)
FROM nginx:alpine
# ビルドした静的ファイルをNginxの配信フォルダにコピー
COPY --from=build /app/dist /usr/share/nginx/html
# 80番ポートで配信する
EXPOSE 80</div>
              <p class="text-paragraph">これにより、EC2でもNginxコンテナが80番で配信するようになります。</p>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">2</span>
              <span class="step-title">Spring Boot用のDockerfileを作成する</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph">Spring Bootはjarを作成し、コンテナ内で <code>java -jar</code> で起動する形にすると理解しやすいです。まずはGradleでjarを作り、そのjarをDockerfileでコピーして、8080番で起動する設定にします。</p>
              
              <h4 style="margin-top: 1em;">1. ローカルでjarファイルをビルドする</h4>
              <p class="text-paragraph">ターミナルを開き、<code>myapp/backend</code> フォルダに移動して以下のコマンドを実行し、jarファイルを作成します（※Java環境が必要です。もしJava環境がない場合は、後述のDocker Compose起動時にエラーになりますが、今回はこの方法で進めます）。</p>
              <div class="code-block"><button class="copy-btn" onclick="copyCode(this)">コピー</button>cd ../backend

# Mac/Linuxの場合
./gradlew clean build -x test

# Windowsの場合
gradlew.bat clean build -x test</div>

              <h4 style="margin-top: 1em;">2. Dockerfileの作成</h4>
              <p class="text-paragraph"><code>myapp/backend/</code> フォルダ内に <code>Dockerfile</code> を作成し、以下の内容を記述します。</p>
              <div class="code-block"><button class="copy-btn" onclick="copyCode(this)">コピー</button># 軽量なJDKイメージを使用
FROM eclipse-temurin:21-jdk-alpine
WORKDIR /app

# Gradleでビルドしたjarファイルをコンテナ内にコピー
COPY build/libs/*.jar app.jar

# 8080番ポートを公開
EXPOSE 8080

# jarファイルを実行
ENTRYPOINT ["java", "-jar", "app.jar"]</div>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">3</span>
              <span class="step-title">docker-compose.yml を作成する</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph">Composeファイルでは、servicesとvolumesを定義します。MySQLはDocker Hubの公式イメージを使って起動します。データを永続化するためにvolumeを使用し、初期データ投入に <code>init.sql</code> を使います。また、MySQLの起動待ちには <code>depends_on</code> だけでなく <code>healthcheck</code> も組み合わせると安定しやすいです。</p>
              <p class="text-paragraph"><code>myapp/deploy/</code> フォルダ内に <code>docker-compose.yml</code> を作成し、以下の内容を記述します。</p>
              <div class="code-block"><button class="copy-btn" onclick="copyCode(this)">コピー</button>services:
  # フロントエンド (React + Nginx)
  frontend:
    build: ../frontend
    ports:
      - "80:80"
    depends_on:
      - backend

  # バックエンド (Spring Boot)
  backend:
    build: ../backend
    ports:
      - "8080:8080" # ローカル確認用（本番EC2では外に開けない方が安全です）
    environment:
      # 接続先は localhost ではなくサービス名 db を指定
      SPRING_DATASOURCE_URL: jdbc:mysql://db:3306/sampledb
    depends_on:
      db:
        condition: service_healthy

  # データベース (MySQL)
  db:
    image: mysql:8.4
    environment:
      MYSQL_ROOT_PASSWORD: password
      MYSQL_DATABASE: sampledb
    volumes:
      - mysql_data:/var/lib/mysql
      # 初期化SQLをコンテナ内に配置
      - ../mysql/init.sql:/docker-entrypoint-initdb.d/init.sql
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      interval: 10s
      timeout: 5s
      retries: 3

volumes:
  mysql_data:</div>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">4</span>
              <span class="step-title">Dockerによる実行と動作確認</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph">AWSに持っていく前に、必ずローカルPCで3つの確認を済ませます。ローカルで動かないものは、EC2に載せてもほぼ動きません。</p>
              
              <h4 style="margin-top: 1em;">1. コンテナの起動</h4>
              <p class="text-paragraph">ターミナルで <code>myapp/deploy</code> フォルダに移動し、コンテナを起動します。</p>
              <div class="code-block"><button class="copy-btn" onclick="copyCode(this)">コピー</button>cd ../deploy
docker compose up -d --build</div>
              <p class="text-paragraph">※ 初回はイメージのビルドとダウンロードに数分かかります。</p>

              <h4 style="margin-top: 1em;">2. 動作確認</h4>
              <p class="text-paragraph">起動が完了したら、ブラウザを開いて以下の3点を確認します。</p>
              <ul class="feature-list">
                <li><strong>Reactの画面が開くか:</strong> <code>http://localhost</code> にアクセスし、Reactの画面が表示されることを確認します。</li>
                <li><strong>Spring BootのAPIが返るか:</strong> <code>http://localhost:8080/api/messages</code> にアクセスし、JSON形式のデータ（例: <code>[{"id":1,"content":"Hello from MySQL!"},...]</code>）が返ってくることを確認します。</li>
                <li><strong>Spring BootからMySQLに接続できるか:</strong> 上記のAPIからデータが返ってきていれば、MySQLへの接続も成功しています。また、Reactの画面上にも取得したメッセージリストが表示されているはずです。</li>
              </ul>
            </div>
          </div>
        </div>
      `
    },
    // ハンズオン3: ECRにコンテナイメージをプッシュする
    {
      id: "7-handson3",
      title: "ハンズオン3：ECRにコンテナイメージをプッシュする",
      type: "explanation",
      content: `
        <div class="chapter-container">
          <h2 class="section-title">&#128736; ハンズオン3：ECRにコンテナイメージをプッシュする</h2>
          
          <div class="point-box">
            <ul class="feature-list">
              <li><strong>操作場所：</strong> AWSマネジメントコンソール ＆ ローカル（Macのターミナル）</li>
              <li><strong>ゴール：</strong> ECRリポジトリを作成し、ローカルでビルドしたイメージをプッシュする。</li>
            </ul>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">1</span>
              <span class="step-title">ECRリポジトリの作成（AWSコンソール）</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph">まずはコンテナの保管庫となるリポジトリを作成します。</p>
              <ol class="feature-list" style="padding-left: 1.5em; margin-bottom: 1em;">
                <li>AWSマネジメントコンソールにログインし、画面上部の検索バーで <strong>「ECR」</strong> と検索して「Elastic Container Registry」を開きます。</li>
                <li>左側のメニューから「リポジトリ」を選択し、オレンジ色の <strong>「リポジトリを作成」</strong> ボタンをクリックします。</li>
                <li>「可視性設定」で「プライベート」が選ばれていることを確認します。</li>
                <li>「リポジトリ名」に <code>myapp-frontend</code> と入力し、画面一番下の「リポジトリを作成」を押します。これでReact用のリポジトリが1つ完成します。</li>
                <li>まったく同じ手順でもう一度「リポジトリを作成」を開き、リポジトリ名 <code>myapp-backend</code> で作成します。これでSpring Boot用のリポジトリも完成です。</li>
              </ol>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">2</span>
              <span class="step-title">プッシュコマンドの表示（AWSコンソール）</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph">次に、ローカル環境からAWSへイメージをプッシュするための専用コマンドを確認します。</p>
              <ol class="feature-list" style="padding-left: 1.5em; margin-bottom: 1em;">
                <li>コンソールのリポジトリ一覧画面で、作成した <code>myapp-frontend</code> の左横にあるラジオボタン（〇）にチェックを入れます。</li>
                <li>画面右上にある <strong>「プッシュコマンドの表示」</strong> というボタンをクリックします。</li>
                <li>画面に「1. 認証 (login)」「2. ビルド (build)」「3. タグ付け (tag)」「4. プッシュ (push)」の4つのコマンドが表示されます（お使いのOSに合わせてmacOS/LinuxかWindowsかを選択してください）。</li>
              </ol>
              <p class="text-paragraph">この画面を開いたまま、次のステップに進みます。</p>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">3</span>
              <span class="step-title">ECRにログインする（ローカルのターミナル）</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph">ここからはご自身のPCのターミナル（またはコマンドプロンプト等）で作業します。現在のディレクトリが親フォルダである <code>myapp/</code> であることを確認してください。</p>
              <ol class="feature-list" style="padding-left: 1.5em; margin-bottom: 1em;">
                <li>AWSコンソールの「プッシュコマンドの表示」画面にある <strong>1番目のコマンド（<code>aws ecr get-login-password...</code> から始まるもの）</strong> をコピーします。</li>
                <li>ターミナルに貼り付けて実行します。</li>
                <li><code>Login Succeeded</code> と表示されれば成功です。</li>
              </ol>
              <div class="info-box">
                <div class="info-box-title">&#128161; 大事なポイント</div>
                <p>リージョンの指定ミスは非常に多いので、ECR を作ったリージョン（例: <code>ap-northeast-1</code>）と同じ値にそろっているか確認してください。</p>
              </div>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">4</span>
              <span class="step-title">ローカルでbuildしてpushする（ローカルのターミナル）</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph">最後に、Dockerイメージを作成（ビルド）し、ECRにアップロード（プッシュ）します。ここで<strong>ビルドコマンドのパス指定だけ修正する</strong>のがポイントです。</p>
              
              <h4 style="margin-top: 1em;">1. React（フロントエンド）のプッシュ</h4>
              <p class="text-paragraph">引き続き <code>myapp-frontend</code> のプッシュコマンド画面を見ながら進めます。</p>
              <ul class="feature-list" style="padding-left: 1.5em; margin-bottom: 1em;">
                <li><strong>ビルド:</strong> 表示されている2番目のコマンドをターミナルに貼り付けますが、一番最後の <code>.</code>（カレントディレクトリ）を <code>./frontend</code> に書き換えて実行します。<br>
<div class="code-block"><button class="copy-btn" onclick="copyCode(this)">コピー</button># 例: docker build -t myapp-frontend ./frontend</div></li>
                <li><strong>タグ付け:</strong> 3番目のコマンド（<code>docker tag ...</code>）をそのままコピーして実行します。</li>
                <li><strong>プッシュ:</strong> 4番目のコマンド（<code>docker push ...</code>）をそのままコピーして実行します。</li>
              </ul>

              <h4 style="margin-top: 1em;">2. Spring Boot（バックエンド）のプッシュ</h4>
              <p class="text-paragraph">フロントエンドが終わったら、「プッシュコマンドの表示」画面を閉じます。リポジトリ一覧から <code>myapp-backend</code> を選択し直して、再度「プッシュコマンドの表示」を開きます。</p>
              <ul class="feature-list" style="padding-left: 1.5em; margin-bottom: 1em;">
                <li><strong>ビルド:</strong> 2番目のコマンドを貼り付け、一番最後を <code>./backend</code> に書き換えて実行します。<br>
<div class="code-block"><button class="copy-btn" onclick="copyCode(this)">コピー</button># 例: docker build -t myapp-backend ./backend</div></li>
                <li><strong>タグ付け:</strong> 3番目のコマンドをそのままコピーして実行します。</li>
                <li><strong>プッシュ:</strong> 4番目のコマンドをそのままコピーして実行します。</li>
              </ul>
            </div>
          </div>
        </div>
      `
    },
    // ハンズオン4: EC2でコンテナを起動する
    {
      id: "7-handson4",
      title: "ハンズオン4：EC2でコンテナを起動する",
      type: "explanation",
      content: `
        <div class="chapter-container">
          <h2 class="section-title">&#128736; ハンズオン4：EC2でコンテナを起動する</h2>
          
          <div class="point-box">
            <ul class="feature-list">
              <li><strong>操作場所：</strong> ローカルターミナル（SSH接続）＆ EC2上</li>
              <li><strong>ゴール：</strong> EC2上でECRからイメージをPullし、Docker Composeで起動して動作確認する。</li>
            </ul>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">1</span>
              <span class="step-title">EC2へのSSH接続</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph"><strong>【ローカル】</strong> MacからEC2へSSH接続します。</p>
              <div class="code-block"><button class="copy-btn" onclick="copyCode(this)">コピー</button>ssh -i "your-key.pem" ec2-user@&lt;EC2のパブリックIPまたはDNS名&gt;</div>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">2</span>
              <span class="step-title">Dockerのインストール</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph"><strong>【EC2上】</strong> EC2にDockerとDocker Compose pluginをインストールします。</p>
              <div class="code-block"><button class="copy-btn" onclick="copyCode(this)">コピー</button>sudo dnf update -y
sudo dnf install -y docker
sudo service docker start
sudo usermod -aG docker ec2-user
sudo dnf install -y docker-compose-plugin</div>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">3</span>
              <span class="step-title">権限の反映</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph"><strong>【EC2上】</strong> <code>docker</code> グループへの追加を反映させるため、一度ログアウト（<code>exit</code>）して再度SSHで入り直します。</p>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">4</span>
              <span class="step-title">ECRへのログイン</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph"><strong>【EC2上】</strong> EC2側からECRにログインします。ハンズオン3のログインコマンドと同じものを実行します。</p>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">5</span>
              <span class="step-title">設定ファイルの転送</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph"><strong>【ローカル】</strong> 別のターミナルを開き、ローカルの <code>docker-compose.yml</code> と <code>.env</code> をEC2に転送します。</p>
              <div class="code-block"><button class="copy-btn" onclick="copyCode(this)">コピー</button>scp -i "your-key.pem" docker-compose.yml .env ec2-user@&lt;EC2のIP&gt;:~/myapp/deploy/</div>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">6</span>
              <span class="step-title">コンテナの起動</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph"><strong>【EC2上】</strong> 転送したディレクトリに移動し、イメージをPullしてコンテナを起動します。</p>
              <div class="code-block"><button class="copy-btn" onclick="copyCode(this)">コピー</button>docker compose --env-file .env pull
docker compose --env-file .env up -d</div>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">7</span>
              <span class="step-title">動作確認</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph"><strong>【ブラウザ】</strong> <code>http://&lt;EC2のパブリックIP&gt;</code> にアクセスし、以下の確認を行います。</p>
              <ul class="feature-list">
                <li>Reactの画面が開くか</li>
                <li>画面からAPIを呼び、Spring Bootが返るか</li>
                <li>データ登録後にEC2上でコンテナを再起動し、MySQLのデータが残るか（volumeの確認）</li>
              </ul>
            </div>
          </div>
        </div>
      `
    },
    // お片付け（リソースの削除手順）
    {
      id: "7-cleanup",
      title: "お片付け（リソースの削除手順）",
      type: "explanation",
      content: `
        <div class="chapter-container">
          <h2 class="section-title">&#129529; お片付け（リソースの削除手順）</h2>
          
          <p class="text-paragraph">
            課金が継続するのを防ぐため、学習が終わったら以下の手順でリソースを削除します。<br>
            <strong>操作場所：</strong> AWSマネジメントコンソール
          </p>

          <div class="warning-box">
            <h3 class="warning-box-title">&#9888; 削除の順序と注意点</h3>
            <p>以下の順序での削除を推奨します。また、S3は「中身（オブジェクト）を空にしないとバケットを削除できない」という重要な特徴があります。</p>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">1</span>
              <span class="step-title">EC2インスタンスの終了</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph">EC2ダッシュボードから起動したインスタンスを選択し、「インスタンスの状態」から「インスタンスを終了」を実行します。（これによりアタッチされていたEBSボリュームもデフォルト設定であれば削除されます）。</p>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">2</span>
              <span class="step-title">ECRリポジトリの削除</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph">ECRダッシュボードから作成したリポジトリ（frontend / backend）を選択し、削除します。</p>
            </div>
          </div>
          
          <div class="step-container">
            <div class="step-header">
              <span class="step-number">3</span>
              <span class="step-title">S3バケットとオブジェクトの削除</span>
            </div>
            <div class="step-content">
              <ul class="feature-list">
                <li>S3ダッシュボードから作成したバケットのリンクをクリックします。</li>
                <li>アップロードしたファイルのチェックボックスにチェックを入れ、「削除」をクリックします。</li>
                <li>確認画面で <code>完全に削除</code> と入力して「オブジェクトの削除」を実行します。</li>
                <li>バケット一覧画面に戻り、バケット名を選択して「削除」をクリックします（確認画面でバケット名を入力）。</li>
              </ul>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">4</span>
              <span class="step-title">VPCの削除</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph">VPCダッシュボードから作成したVPCを選択し、削除します。（関連するサブネット、IGW、セキュリティグループ等もまとめて削除されます）。</p>
            </div>
          </div>

          <div class="step-container">
            <div class="step-header">
              <span class="step-number">5</span>
              <span class="step-title">IAMロール/ユーザーの削除</span>
            </div>
            <div class="step-content">
              <p class="text-paragraph">学習用に作成したIAMロール（EC2に付与したもの）とIAMユーザーを削除します。</p>
            </div>
          </div>
        </div>
      `
    },
    {
      id: "7-quiz",
      title: "第7章 理解度テスト",
      type: "quiz",
      questions: [
        {
          question: "Amazon ECRの主な役割として正しいものはどれですか？",
          options: [
            { label: "A", text: "仮想サーバー（EC2）のバックアップを取得するサービス" },
            { label: "B", text: "コンテナイメージを安全に保存・管理するためのレジストリサービス" },
            { label: "C", text: "コンテナを実際に実行（ホスティング）するためのサービス" },
            { label: "D", text: "リレーショナルデータベースを管理するサービス" }
          ],
          correct: 1,
          explanation: {
            correct: "正解です！ECRはコンテナイメージの保管庫（レジストリ）です。実際にコンテナを実行するのはEC2などのサービスです。",
            incorrect: "不正解です。ECRはコンテナイメージの保管庫（レジストリ）です。実際にコンテナを実行するのはEC2などのサービスです。"
          }
        },
        {
          question: "ECRの構成要素のうち、アプリケーションごとにコンテナイメージをまとめる「フォルダ」のような役割を持つものはどれですか？",
          options: [
            { label: "A", text: "レジストリ (Registry)" },
            { label: "B", text: "タグ (Tag)" },
            { label: "C", text: "リポジトリ (Repository)" },
            { label: "D", text: "タスク (Task)" }
          ],
          correct: 2,
          explanation: {
            correct: "正解です！「リポジトリ」がプロジェクトやアプリごとの入れ物になります。レジストリはその大枠、タグはイメージのバージョンを示します。",
            incorrect: "不正解です。「リポジトリ」がプロジェクトやアプリごとの入れ物になります。レジストリはその大枠、タグはイメージのバージョンを示します。"
          }
        },
        {
          question: "ECRのセキュリティに関する説明で【誤っている】ものはどれですか？",
          options: [
            { label: "A", text: "IAMと連携して、誰がイメージをPush/Pullできるか細かく制御できる。" },
            { label: "B", text: "デフォルト設定では、アップロードしたイメージはインターネット上に一般公開される。" },
            { label: "C", text: "アップロードしたイメージにソフトウェアの脆弱性がないかスキャンする機能がある。" },
            { label: "D", text: "バックエンドにS3のテクノロジーが使われており、耐久性が非常に高い。" }
          ],
          correct: 1,
          explanation: {
            correct: "正解です！誤っているのはBです。ECRのリポジトリはデフォルトでプライベート（非公開）であり、IAM権限を持たないユーザーはアクセスできません。（意図的に「Public Registry」として公開することも可能です）。",
            incorrect: "不正解です。誤っているのはこの選択肢ではありません。ECRのリポジトリはデフォルトでプライベート（非公開）であり、IAM権限を持たないユーザーはアクセスできません。（意図的に「Public Registry」として公開することも可能です）。"
          }
        },
        {
          question: "ECRのストレージコストを最適化するためのベストプラクティスとして最も適切なものはどれですか？",
          options: [
            { label: "A", text: "ライフサイクルポリシーを設定し、不要になった古いイメージを自動で削除する。" },
            { label: "B", text: "インスタンスタイプを「t3.micro」に変更して料金を抑える。" },
            { label: "C", text: "マルチAZ配置を無効化する。" },
            { label: "D", text: "ECRではなくEC2の中に自前でDocker Registryを立てて運用する。" }
          ],
          correct: 0,
          explanation: {
            correct: "正解です！コンテナイメージは開発ごとに増え続けるため、ライフサイクルポリシーによる自動削除ルールを設定してコストを節約するのが基本です。",
            incorrect: "不正解です。コンテナイメージは開発ごとに増え続けるため、ライフサイクルポリシーによる自動削除ルールを設定してコストを節約するのが基本です。"
          }
        },
        {
          question: "ローカル環境で作成したコンテナイメージをECRにアップロード（Push）する際の、正しい手順の流れはどれですか？",
          options: [
            { label: "A", text: "イメージをビルド → ECRへPush → イメージにタグ付け → ECRにログイン" },
            { label: "B", text: "ECRにログイン → リポジトリの作成 → イメージのビルド → イメージへのタグ付け → ECRへPush" },
            { label: "C", text: "コンテナを起動 → スナップショットを作成 → S3バケットに保存 → ECRへインポート" },
            { label: "D", text: "EC2インスタンスを起動 → Dockerをインストール → マネジメントコンソールから直接アップロード" }
          ],
          correct: 1,
          explanation: {
            correct: "正解です！ECRにイメージをアップロードするには、まずECRへのログイン（認証）と保存先（リポジトリ）の準備を行います。その後、ローカルでイメージをビルドし、ECRの宛先情報を含んだタグ（URI）を付けてからPushを実行します。",
            incorrect: "不正解です。ECRにイメージをアップロードするには、まずECRへのログイン（認証）と保存先（リポジトリ）の準備を行います。その後、ローカルでイメージをビルドし、ECRの宛先情報を含んだタグ（URI）を付けてからPushを実行します。"
          }
        }
      ]
    },
    // 修了画面
    {
      id: "7-complete",
      title: "修了",
      type: "explanation",
      content: `
        <div class="chapter-container">
          <div class="confetti-container" id="confetti-container"></div>

          <div class="completion-screen">
            <div class="completion-badge">&#127891;</div>
            <h2 class="completion-title">全7章 修了おめでとうございます！</h2>
            <p class="completion-subtitle">AWS クラウド技術入門のすべての章を学習しました</p>
            <div class="completion-chapters">
              <div class="completion-chapter-item"><span class="completion-check">&#10003;</span>01 AWSの概要</div>
              <div class="completion-chapter-item"><span class="completion-check">&#10003;</span>02 IAM</div>
              <div class="completion-chapter-item"><span class="completion-check">&#10003;</span>03 VPC</div>
              <div class="completion-chapter-item"><span class="completion-check">&#10003;</span>04 EC2</div>
              <div class="completion-chapter-item"><span class="completion-check">&#10003;</span>05 RDS</div>
              <div class="completion-chapter-item"><span class="completion-check">&#10003;</span>06 S3</div>
              <div class="completion-chapter-item"><span class="completion-check">&#10003;</span>07 ECR</div>
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
