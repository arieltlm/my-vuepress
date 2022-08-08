# 终端增加oh-my-zsh记录

[[toc]]

## 1.安装oh-my-zsh

[mac下终端iTerm2配置](https://www.jianshu.com/p/bb630ada1f02)

oh-my-zsh是mac下shell（zsh）的开源配置管理框架

检查下自己默认的shell是否是zsh：

```bash
echo $0
```

手动切换终端为zsh：

```bash
chsh -s /bin/zsh
```

安装oh-my-zsh:

```bash
git clone git://github.com/robbyrussell/oh-my-zsh.git ~/.oh-my-zsh
cp ~/.zshrc ~/.zshrc.orig
cp ~/.oh-my-zsh/templates/zshrc.zsh-template ~/.zshrc
```

## 2.主题配置

[oh-my-zsh 配置目录路径，绝对路径配置成先对路径，配置主题](https://blog.csdn.net/weixin_36429334/article/details/73935272?utm_source=blogxgwz6)



### 1).默认主题的应用

* 1. 打开 ~/.zshrc （ 默认用户目录下 ～ 注意查看隐藏文件 ls -a ）下的文件查看当前使用的主题

```bash
//这个 robbyrussell 就是我的配置主题（默认主题）
ZSH_THEME="robbyrussell"

plugins=(git)

source $ZSH/oh-my-zsh.sh
```

* 2. 进入主题列表编辑主题文件 路径在

```bash
//～ 目录下切换目录
cd .oh-my-zsh/themes
//编辑主题文件 robbyrussell  等于 robbyrussell.zsh-theme
vim robbyrussell.zsh-theme
//修改配置,这个主题默认是%c其使用的最后一层的文件名。可以改成%d——显示整个文件路径
//PROMPT='${ret_status} %{$fg[cyan]%}%c%{$reset_color%} $(git_prompt_info)'
PROMPT='${ret_status} %{$fg[cyan]%}%d%{$reset_color%} $(git_prompt_info)'
```



**相关配置提示符如下**:

```bash
%%  一个'%'
#%) 一个')'
%y  当前的tty名
%l  当前的tty名，如 pts/1
%M  完整主机名
%m  主机名（在第一个句号之前截断）
%n  当前用户名
%. %c %C 前两个显示相对路径的当前文件夹名，最后一个是绝对路径（也就是说，前两个在家目录下显示'~'，最后那个显示你的用户名），'%'后的数字表示显示几层路径
%N  zsh 正在执行的脚本/函数名。如果'%'后跟了数字，似乎还有其他作用
%L  当前shell的层数
%j  当前正在进行的工作数量
%i  与%!类似：The line number currently being executed in the script, sourced file,<br>         or shell function given by %N. This is most useful for debugging as part of $PS4.
%!  显示当前历史事件号码（也就是打开shell后第几条命令）
%/ %d   显示当前工作路径（$pwd）。如果'％'后面是一个整数，它指定显示路径的元件的数量;没有数字就显示整个路径。一个负整数就是指定主目录，即％-1d代表第一部分
%~  目前的工作目录相对于～的相对路径
%?  返回最后命令的执行结果的代码
%#  用户组，#（普通用户）/%（超级用户）
```



* 3. 关闭终端，重启即可



此步操作完，终端就应用上oh-my-zsh了；



[日常折腾 - zsh - 一个更好用的终端](https://www.jianshu.com/p/27c8088dc8f7)

### 2).不同主题表现不同：

> so，上面的配置文件，在不同样式的情况，好像有的更改不起啥作用

在配置文件中更改样式名字，
zsh的配置文件是`~/.zshrc`,

```bash
ZSH_THEME="agnoster"
```

除了系统带的主题，还可以在github上找样式文件更新theme（github上有操作具体说明——下载主题文件，放进去，改配置，source应用）

[github上主题列表](https://github.com/ohmyzsh/ohmyzsh/wiki/Themes)

## 3.autoJump插件的安装

[插件列表](https://github.com/ohmyzsh/ohmyzsh/wiki/Plugins)

[autojump地址](https://github.com/wting/autojump#installation)

安装：

```bash
git clone git://github.com/wting/autojump.git

cd autojump
./install.py /*安装*/
./uninstall.py  /*卸载*/
```

或者这样安装：`brew install autojump`



安装完后，在终端上 会有一段代码让将那段代码拷贝到配置文件（~/.zshrc)中：

同时在plugins中添加autojump：

```bash
plugins=(git autojump)

[[ -s /Users/tlm/.autojump/etc/profile.d/autojump.sh ]] && source /Users/tlm/.autojump/etc/profile.d/autojump.sh

autoload -U compinit && compinit -u
```





## 4.gitee的ohmyzsh

[gitee-ohmyzsh地址](https://gitee.com/shrekuu/ohmyzsh-ohmyzsh?_from=gitee_search)

[gitee主题列表](https://github.com/ohmyzsh/ohmyzsh/wiki/Themes)

[一些其他的主题样式](https://github.com/ohmyzsh/ohmyzsh/wiki/External-themes)

[插件列表](