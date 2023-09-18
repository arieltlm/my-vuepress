# git 操作

<tag-part tagName="git"/>

[[toc]]

## 1. `git` 基础操作

### 1).克隆工程

```bash
git clone [远程仓地址]
```

git 克隆远程指定分支仓库

```bash
git clone -b [指定分支] [远程仓地址]
```

### 2).基于远程 develop 分支在本地新建 aa 分支，进行开发操作

```bash
git checkout -b aa origin/develop
```

### 3).在当前分支 aa 下开发，添加文件

```bash

//查看当前修改的文件

git status

// 添加所有修改的文件

git add .

//添加指定文件

git add project.conf.js

```

- git add -A 提交所有变化

- git add -u 提交被修改(modified)和被删除(deleted)文件，不包括新文件(new)

- git add . 提交新文件(new)和被修改(modified)文件，不包括被删除(deleted)文件

### 4).提交修改到本地仓库

```bash

git commit -m 'feat(project): add proxy config'
```

### 5).更新远程仓库

```bash

git remote update

```

### 6).合并远程 develop 分支代码到当前分支 tlm

```bash

git rebase origin/develop
git merge origin/develop
```

如果有冲突，修改冲突后，执行`git add [file-name]`标记冲突已解决，最后执行 git rebase --continue

在 rebase 操作全部完成以后，才可以执行 push 动作！！！

`rebase`和`merge`的区别可见 10

> 不要在公共分支使用 rebase
>
> 本地和远端对应同一条分支,优先使用 rebase,而不是 merge

### 7).推送当前分支到远程

```bash

git push origin tlm

```

### 8).发送合并请求，同下面可视化方式第 9 步

### 9).更改远程仓库

- (1).修改

```bash
git remote set-url origin [url]
```

- (2).先删后加

```bash
git remote rm origin
git remote add origin [url]
```

- (3).直接修改 config 文件

### 10).git merge

要把 tlm 分支 merge 到 master 分支。 git merge 只是进行本地的合并

```bash
git checkout master
git merge tlm
```

有权限的情况下，然后再提交到 master 分支；或者在页面上创建 merge 请求；

### 11).删除分支

删除远程分支

```bash
git push origin --delete dev

```

删除本地分支

```bash
git branch -d dev
```

### 12).拉取远程代码

```bash
git pull origin master  从远程拉取最新版本到本地  自动合并merge
git fetch origin master  从远程获取最新版本到本地   不会自动合并merge
```

实际使用中建议使用`git fetch`,更安全,在 merge 之前可以看清楚更新情况,再决定是否合并(远程合并——`git merge origin/master`)

### 13).拉取远程分支

拉取一个新的分支，并在本地使用时，可以直接`git fetch`

![image.png](~@alias/git/git-pull.png)

### 14).查看 temp 分支与本地原有分支的不同

```bash
git diff temp
```

### 15).查看分支

- 查看本地分支列表：

```bash
git branch
```

- 查看远程分支列表:

```bash
git branch -r
```

- 查看所有分支列表（本地+远程）:

```bash
git branch -a
```

### 16).查看远程仓库地址

```bash
git remote -v
```

### 17).查看 git 配置

```bash
git config --list
```

### 18).修改提交信息

```bash
git commit --amend -m 'commit modify'
```

注意 commit id 会发生变化，但是上次的提交信息会被去除

### 19).中断当前 merge

```bash
git merge --abort
```

## 2. git 回退历史版本

[版本回退](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/0013744142037508cf42e51debf49668810645e02887691000)

查看版本历史：

```bash
git log
//或者
git log --pretty=oneline
```

回退上一个版本

```bash
git reset --hard HEAD^
```

回退某个版本： (版本号没必要写全，前几位就可以了，Git 会自动去找。)

```bash
git reset --hard 1094a
```

记录你的每一次命令:

```bash
git reflog
```

## 3. 初始连接 github

![image.png](~@alias/git/github-init.png)

## 4. 切换 git 用户

情景：原电脑上有之前的用户的 git。新建了 github 库之后，需要重置 git config 以及重新添加 ssh key

[git 初始化及常用命令](https://www.jianshu.com/p/1503ffd70a57)

```bash
git config --global user.name "your name"
git config --global user.email "email@example.com"
```

说明： email 可以不写

生成 ssh：

```bash
ssh-keygen -t rsa -C "email@example.com"
ssh-keygen -t rsa // 不写邮箱的写法
```

接着取 ssh-key，可使用命令：

```bash
cat ~/.ssh/id_rsa.pub
```

然后将下面的 key 拿过去在 github 中账户管理处增加 ssh

## 5. .gitignore 中增加过滤规则不起作用

[.gitignore 中增加过滤规则不起作用的解决方法](https://blog.csdn.net/get_set/article/details/53246538)

缓存了。

```
git rm -r --cached .
git add .
git commit -m 'update .gitignore'
```

## 6. Updates were rejected because the tip of your current branch is behind

> vue-test 直接提交到自己的 github

[Updates were rejected because the tip of your current branch is behind](https://www.cnblogs.com/code-changeworld/p/4779145.html)

我用第一种方法解决了(强制提交）：

```
git push -u origin master -f
```

此法会使远程修改丢失，一般是不可取的，尤其是多人协作开发的时候。

## 7. Git-命令行-拯救“Your local changes to the following files would be overwritten by checkout .eslintcache”

> 外运切换分支时的问题

[Git-命令行-拯救“Your local changes to the following files would be overwritten by checkout”](https://blog.csdn.net/qq_32452623/article/details/75645578)

问题：当前分支有未跟踪的文件，checkout 命令会覆盖它们，请缓存( stash )或者提交( commit )。

git 的本地版本管理有三个部分

名称 说明工作区（Working Directory） 我们直接编辑的文件部分暂存区（Staged Snapshot） 文件执行 git add . 后存的地方版本库区 (Commit History) 文件执行 git commit . 后存的地方它们三个的关系是这样样子的： ![image.png](~@alias/git/git1.png)

1.未跟踪文件的内容改动很重要，保存修改

```bash
//第一种方式 存到暂存区
git add.
git stash
//取出的时候使用
git stash pop

//第二种方式 发起一个commit 存到提交历史
git add.
git commit -m "commit message"
```

2.未跟踪文件的内容改动不重要，放弃修改这个有两种办法，清除修改和强制切换分支

推荐做法：清除未跟踪文件

```bash
git clean n  //这个是清除文件预览
git clean -f //强制清除文件
```

强制切换分支

强制切换分支命令如下，结果同提示说的那样，会直接覆盖未跟踪的文件。这个方式我觉得很是粗暴，我们日常切换的时候，还是不要使用 -f 强制切换，没有覆盖提示，很容易发生文件修改丢失，但是我们自己不知道。

```bash
git checkout -f [branch]
```

## 8. 删除远程分支文件

> 问题描述：开始在.gitignore 中没有添加忽略.history。然后在其中添加后，远程的无法删除，需要手动删除远程分支的文件

删除 target 文件

```bash
git rm -r --cached target
git commit -m "delete target/"
git push origin master
```

```bash
git rm test.txt (删除文件)

git rm -r test (删除文件夹)
```

## 9. 删除远程文件的时候，报错 fatal: pathspec 'readme.txt' did not match any files

原因是新建的这个文件被列为“被忽略”的文件，不在 Git 的控制之下。

解决方法： 先 add，再添加-f 参数进行删除：

```bash
git add readme.txt
git rm -f readme.txt
```

-f 是强制的意思

## 10. merge 和 rebase 的区别

[git rebase 还是 merge 的使用场景最通俗的解释](https://www.jianshu.com/p/4079284dd970)

rebase: ![rebase](~@alias/rebase.jpeg)

merge: ![merge](~@alias/rebase1.jpeg)

**注意:**

- 不要在公共分支使用 rebase
- 本地和远端对应同一条分支,优先使用 rebase,而不是 merge

`git rebase`——重新设置基线（变基）

为什么不要再公共分支使用 rebase? 因为往后放的这些 commit 都是新的,这样其他从这个公共分支拉出去的人，都需要再 rebase,相当于你 rebase 东西进来，就都是新的 commit 了

1-2-3 是现在的分支状态这个时候从原来的 master ,checkout 出来一个 prod 分支然后 master 提交了 4.5，prod 提交了 6.7 这个时候 master 分支状态就是 1-2-3-4-5，prod 状态变成 1-2-3-6-7 如果在 prod 上用 rebase master ,prod 分支状态就成了 1-2-3-4-5-6-7 如果是 merge 1-2-3-6-7-8 ........ |4-5| 会出来一个 8，这个 8 的提交就是把 4-5 合进来的提交

**merge 和 rebase 实际上只是用的场景不一样：**

更通俗的解释一波. 比如 rebase,你自己开发分支一直在做,然后某一天，你想把主线的修改合到你的分支上,做一次集成,这种情况就用 rebase 比较好.把你的提交都放在主线修改的头上如果用 merge，脑袋上顶着一笔 merge 的 8,你如果想回退你分支上的某个提交就很麻烦,还有一个重要的问题,rebase 的话,本来我的分支是从 3 拉出来的,rebase 完了之后,就不知道我当时是从哪儿拉出来的我的开发分支同样的,如果你在主分支上用 rebase, rebase 其他分支的修改,是不是要是别人想看主分支上有什么历史,他看到的就不是完整的历史课,这个历史已经被你篡改了

## 11. tag

`git clone` 整个仓库后使用，以下命令就可以取得该 tag 对应的代码了

```bash
git checkout tag_name
```

但是，这时候 git 可能会提示你当前处于一个“detached HEAD" 状态。

因为 tag 相当于是一个快照，是不能更改它的代码的。

如果要在 tag 代码的基础上做修改，你需要一个分支：

```bash
git checkout -b branch_name tag_name
```

这样会从 tag 创建一个分支，然后就和普通的 git 操作一样了。

---

- git 查看 tag 的命令是

```bash
git tag

```

- 创建 Tag 是直接加名字就 ok 了，格式：

```bash
git tag 名字 –m "注释"
```

- 推到远程

```bash
git push origin tag名
```

- 删除远程 tag

```bash
git push origin --delete tag名
```

- 删除本地所有 tag

```bash
git tag -d $(git tag -l)
```

## 12.git cherry-pick

[阮一峰 git cherry-pick 教程](http://www.ruanyifeng.com/blog/2020/04/git-cherry-pick.html)

```bash
git cherry-pick <commitHash>
```

**转移多个提交:**

```bash
git cherry-pick <HashA> <HashB>

git cherry-pick A..B  // 从A到B的提交，不包含A

git cherry-pick A^..B // 从A到B,包含A
```

**转移到另一个代码库:**

```bash
git remote add target git://gitUrl

git fetch target

git log target/master

git cherry-pick <commitHash>

```

**配置项:**

- -e，--edit：打开外部编辑器，编辑提交信息
- -n，--no-commit：只更新工作区和暂存区，不产生新的提交
- -x：在提交信息的末尾追加一行(cherry picked from commit ...)，方便以后查到这个提交是如何产生的
- -s，--signoff：在提交信息的末尾追加一行操作者的签名，表示是谁进行了这个操作
- -m parent-number，--mainline parent-number：-m 配置项告诉 Git，应该采用哪个分支的变动

**代码冲突：**

如果操作过程中发生代码冲突，Cherry pick 会停下来，让用户决定如何继续操作

- --continue：用户解决代码冲突后，第一步将修改的文件重新加入暂存区（git add .），第二步使用下面的命令，让 Cherry pick 过程继续执行。
- --abort：发生代码冲突后，放弃合并，回到操作前的样子
- --quit：发生代码冲突后，退出 Cherry pick，但是不回到操作前的样子

## 13.fatal: unable to access 'https://github.com/xxx/':443

LibreSSL SSL_connect: SSL_ERROR_SYSCALL in connection to github.com:443

[文章 fatal:443](https://blog.csdn.net/chaseDreamer_/article/details/114399972)

执行命令即可：

- 方法一：

```bash
git config --global --unset http.proxy

git config --global --unset https.proxy
```

如果还不行，换下面这个:

- 方法二

```bash
git config --global --add remote.origin.proxy ""
```

此上两个方法是时好时坏；最终使用重新给 github 上增加 ssh key 解决

## 14.一个让 git clone 提速几十倍的小技巧

【引】[一个让 git clone 提速几十倍的小技巧](https://juejin.cn/post/6969206858179411982?utm_source=gold_browser_extension)

```bash
git clone https://github.com/microsoft/TypeScript --depth=1 ts
```

在后面增加`--depth=`等于几即下载几个 commit，内容少速度就上去了；缺点是：不能切换到历史 commit 和历史分支

## 15.fatal: Authentication failed for 'https://github.com/arieltlm/my-blog.git/'

> emote: Support for password authentication was removed on August 13, 2021. remote: Please see https://docs.github.com/en/get-started/getting-started-with-git/>about-remote-repositories#cloning-with-https-urls for information on currently recommended modes of authentication. fatal: Authentication failed for 'https://github.com/arieltlm/my-blog.git/'

大概意思就是 2021.8 月份开始远程登录不在支持使用账户密码的方式

解决办法参考[Github 即日起不再支持基于密码的授权方式：Support for password authentication was removed on August 13, 2021](https://blog.csdn.net/vitaviva/article/details/119842190?utm_medium=distribute.pc_relevant.none-task-blog-2~default~baidujs_title~default-1.no_search_link&spm=1001.2101.3001.4242.2)这篇文章讲的很清楚

总结如下：

去 github-settings/Developer Settings/Personal access tokens 中生成 token，需要复制记录起来，下次进入不可查看，note 可以随便写；然后拿着生成的 token 在 git push 时要输入 username 和 password，此时 password 中输入刚生成的 token；还可以——

```bash
$ git push https://$your_token@github.com/username/repo.git
```

为了避免每次输入，直接修改远程仓库地址，加上 token：

```bash
$ git remote set-url origin https://$your_token@github.com/arietlm/my-blog.git
```

如果 push 的时候没有提示输入用户名密码，此时可以先输入以下命令：

```bash
git config --system --unset credential.helper
```

![git-tokens](~@alias/git/git-token.png)

## 16.报错 git: 'credential-wincred' is not a git command. See 'git --help'.

应运行 git config --unset-all credential.helper 并运行 git config --global credential.helper osxkeychain。 这将导致您使用 macOS 钥匙串来存储凭据，这将在 macOS 上运行

## 17.The RSA host key for github.com has changed,

and the key for the corresponding IP address 20.205.243.166 is unknown. This could either mean that DNS SPOOFING is happening or the IP address for the host and its host key have changed at the same time.

[ssh:The ECDSA host key for gitlab.317hu.com has changed 解决办法](https://www.jianshu.com/p/04a05cf6ff9f)

ssh 会把你每个你访问过计算机的公钥(public key)都记录在~/.ssh/known_hosts。当下次访问相同计算机时，会核对公钥。如果公钥不同，ssh 会发出警告，避免你受到 DNS Hijack 之类的攻击。因此我们现在只需要删除 knows_hosts 文件中所对应的公钥即可；

我使用第二种方法解决的： 1.粗暴点，直接删除 known_hosts 文件，重新生成一个直接删除 rsa,id_rsa.pub,known_hosts 文件 2、执行下面命令, 一路回车，不用设置密码

```bash
ssh-keygen -t rsa -C "(你自己的github账号-邮箱)"
```

3、查看公钥,输入命令,得到公钥 cat ~/.ssh/id_rsa.pub 4.将公钥添加到 github 上

# 18.将 github 作为图床

将图片上传到 github 后，在云笔记中使用 github 的链接图片却不能加载，解决办法是路径的问题，需要修改： https://github.com/用户名/repository仓库名/raw/分支名master/图片文件夹名称/.png or.jpg

注意这个 raw 的地方，对地址栏的 url 我只修改了这一处就可以使用了
