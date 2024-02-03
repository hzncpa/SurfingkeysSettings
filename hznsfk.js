settings.smoothScroll = true;
const {
    unmap,
    iunmap,
    vunmap,
    aceVimMap,
    mapkey,
    imap,
    imapkey,
    getClickableElements,
    vmapkey,
    map,
    cmap,
    addSearchAlias,
    removeSearchAlias,
    tabOpenLink,
    readText,
    Clipboard,
    Front,
    Hints,
    Visual,
    RUNTIME
} = api;
// set theme
settings.theme = `
.sk_theme {
    font-family: Input Sans Condensed, Charcoal, sans-serif;
    font-size: 10pt;
    background: #24272e;
    color: #abb2bf;
}
.sk_theme tbody {
    color: #fff;
}
.sk_theme input {
    color: #d0d0d0;
}
.sk_theme .url {
    color: #61afef;
}
.sk_theme .annotation {
    color: #56b6c2;
}
.sk_theme .omnibar_highlight {
    color: #528bff;
}
.sk_theme .omnibar_timestamp {
    color: #e5c07b;
}
.sk_theme .omnibar_visitcount {
    color: #98c379;
}
.sk_theme #sk_omnibarSearchResult ul li:nth-child(odd) {
    background: #303030;
}
.sk_theme #sk_omnibarSearchResult ul li.focused {
    background: #3e4452;
}
#sk_status, #sk_find {
    font-size: 20pt;
}`;

mapkey('yq', '#7Copy pre text', function () {
    Hints.create("pre", function (element) {
        Clipboard.write(element.innerText);
    });
});

     mapkey(',', '#8Bookmark current page to selected folder', function () {
            var page = {
                url: window.location.href,
                title: document.title
            };
            Front.openOmnibar(({ type: "AddBookmark", extra: page }));
        });
//搜索
map('\\', 'gi');

//滚动
map('j', 'd');
map('k', 'e');
map('a','e');
map('s','G');
map('q','E');
map('e','R');
map('gxz', 'gx0');
map('gxc', 'gx$');


//


//标签切换
map('J', 'E');
map('K', 'R');
map('h', 'E');
map('l', 'R');

//移动标签
map('H', '<<');
map('L', '>>');

//翻页
map('[', '[[');
map(']', ']]');

//设置无论开多少标签都不用框子来选择标签,方便快捷键
settings.tabsThreshold = 100;

mapkey('yet', '#7Copy a table', function() {
	Hints.create("table", function(element) {
		selectElement(element);
		document.execCommand('copy');
		// Clipboard.write(element.innerText);
	});
});

selectElement = function (el) {
    var range = document.createRange(),
        selection = window.getSelection();

    range.selectNodeContents(el);
    selection.removeAllRanges();
    selection.addRange(range);
}

mapkey('of','#8Open Search with alias f',function(){
    Front.openOmnibar({type: "SearchEngine", extra: "f"});
});
addSearchAlias('f','f','https://fsoufsou.com/search?q=','s','https://fsoufsou.com/search?q=',function(rt){
    var xst_bilirt=JSON.parse(rt.text);
    if(xst_bilirt.code!='0')return [];
    return xst_bilirt.result.tag.map(ele=>ele.value);
});

