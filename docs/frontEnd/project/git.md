# git 操作
>2018-10-09
<tag-part tagName="git"/>


[[toc]]

## 1. `git` 基础操作


### 1).克隆工程

```bash
git clone [远程仓地址]
```
git克隆远程指定分支仓库

```bash
git clone -b [指定分支] [远程仓地址]
```

### 2).基于远程develop分支在本地新建aa分支，进行开发操作

```bash
git checkout -b aa origin/develop
```

### 3).在当前分支aa下开发，添加文件

```bash

//查看当前修改的文件

git status

// 添加所有修改的文件

git add . 

//添加指定文件

git add project.conf.js

```


*  git add -A  提交所有变化

*  git add -u  提交被修改(modified)和被删除(deleted)文件，不包括新文件(new)

*  git add .  提交新文件(new)和被修改(modified)文件，不包括被删除(deleted)文件



### 4).提交修改到本地仓库

```bash

git commit -m 'feat(project): add proxy config'
```

### 5).更新远程仓库

```bash

git remote update

```

### 6).合并远程develop分支代码到当前分支tlm

```bash

git rebase origin/develop
git merge origin/develop
```

如果有冲突，修改冲突后，执行`git add [file-name]`标记冲突已解决，最后执行git rebase --continue

在rebase操作全部完成以后，才可以执行push动作！！！

`rebase`和`merge`的区别可见10

>不要在公共分支使用rebase
>
> 本地和远端对应同一条分支,优先使用rebase,而不是merge


### 7).推送当前分支到远程

```bash

git push origin tlm

```

### 8).发送合并请求，同下面可视化方式第9步

### 9).更改远程仓库

* (1).修改
    
```bash
git remote set-url origin [url]
```

* (2).先删后加
    
    
```bash
git remote rm origin
git remote add origin [url]
```

* (3).直接修改config文件

### 10).git merge

要把tlm分支merge到master分支。
git merge只是进行本地的合并

```bash
git checkout master
git merge tlm
```
有权限的情况下，然后再提交到master分支；
或者在页面上创建merge请求；
    
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

实际使用中建议使用`git fetch`,更安全,在merge之前可以看清楚更新情况,再决定是否合并(远程合并——`git merge origin/master`)

### 拉取远程分支
拉取一个新的分支，并在本地使用时，可以直接`git fetch`

![WX20200325-172606@2x.png](https://i.loli.net/2020/03/25/Rvx4BlVIuDFZk8E.png)

### 13).查看temp分支与本地原有分支的不同

```bash
git diff temp
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

回退某个版本：
(版本号没必要写全，前几位就可以了，Git会自动去找。)
```bash
git reset --hard 1094a
```

记录你的每一次命令:

```bash
git reflog
```

## 3. 初始连接github

![WX20190215-113136@2x.png](https://i.loli.net/2019/02/15/5c6632bdf120b.png)

## 4. 切换git用户

情景：原电脑上有之前的用户的git。新建了github库之后，需要重置git config 以及重新添加ssh key

[git初始化及常用命令](https://www.jianshu.com/p/1503ffd70a57)

```bash
git config --global user.name "your name"
git config --global user.email "email@example.com"
```

说明： email可以不写

生成ssh：

```bash
ssh-keygen -t rsa -C "email@example.com"
ssh-keygen -t rsa // 不写邮箱的写法
```

接着取ssh-key，可使用命令：

```bash
cat ~/.ssh/id_rsa.pub
```

然后将下面的key拿过去在github中账户管理处增加ssh

## 5. .gitignore中增加过滤规则不起作用

[.gitignore中增加过滤规则不起作用的解决方法](https://blog.csdn.net/get_set/article/details/53246538)

缓存了。

```
git rm -r --cached .
git add .
git commit -m 'update .gitignore'
```

## 6. Updates were rejected because the tip of your current branch is behind 

> vue-test直接提交到自己的github

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

名称	说明
工作区（Working Directory）	我们直接编辑的文件部分
暂存区（Staged Snapshot）	文件执行 git add . 后存的地方
版本库区 (Commit History)	文件执行 git commit . 后存的地方
它们三个的关系是这样样子的：
![20170721152247413.png](https://i.loli.net/2018/08/28/5b853db7397b9.png)

1.未跟踪文件的内容改动很重要，保存修改

```
//第一种方式 存到暂存区
git add.
git stash 
//取出的时候使用 
git stash pop

//第二种方式 发起一个commit 存到提交历史
git add.
git commit -m "commit message"
```

2.未跟踪文件的内容改动不重要，放弃修改
这个有两种办法，清除修改和强制切换分支

推荐做法：清除未跟踪文件

```
git clean n  //这个是清除文件预览
git clean -f //强制清除文件
```

强制切换分支

强制切换分支命令如下，结果同提示说的那样，会直接覆盖未跟踪的文件。这个方式我觉得很是粗暴，我们日常切换的时候，还是不要使用 -f 强制切换，没有覆盖提示，很容易发生文件修改丢失，但是我们自己不知道。

```bash
git checkout -f [branch]
```


## 8. 删除远程分支文件
> 问题描述：开始在.gitignore中没有添加忽略.history。然后在其中添加后，远程的无法删除，需要手动删除远程分支的文件


删除target文件

```
git rm -r --cached target
git commit -m "delete target/"
git push origin master
```

```
git rm test.txt (删除文件)

git rm -r test (删除文件夹)
```

## 9. 删除远程文件的时候，报错fatal: pathspec 'readme.txt' did not match any files

原因是新建的这个文件被列为“被忽略”的文件，不在Git的控制之下。

解决方法： 先add，再添加-f参数进行删除：

```
git add readme.txt
git rm -f readme.txt
```
-f是强制的意思



## 10. merge和rebase的区别

[git rebase 还是 merge的使用场景最通俗的解释](https://www.jianshu.com/p/4079284dd970)


![WX20191124-182106@2x.png](https://i.loli.net/2019/11/24/4g7SvwtEfCRTlc5.png)

![WX20191124-182115@2x.png](https://i.loli.net/2019/11/24/C4SIiDu1UJwkfzX.png)

**注意:**

* 不要在公共分支使用rebase
* 本地和远端对应同一条分支,优先使用rebase,而不是merge

**merge和rebase实际上只是用的场景不一样：**

更通俗的解释一波.
比如rebase,你自己开发分支一直在做,然后某一天，你想把主线的修改合到你的分支上,做一次集成,这种情况就用rebase比较好.把你的提交都放在主线修改的头上
如果用merge，脑袋上顶着一笔merge的8,你如果想回退你分支上的某个提交就很麻烦,还有一个重要的问题,rebase的话,本来我的分支是从3拉出来的,rebase完了之后,就不知道我当时是从哪儿拉出来的我的开发分支
同样的,如果你在主分支上用rebase, rebase其他分支的修改,是不是要是别人想看主分支上有什么历史,他看到的就不是完整的历史课,这个历史已经被你篡改了



