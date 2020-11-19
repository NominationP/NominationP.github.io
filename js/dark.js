function switchDarkMode(){
    var night = document.cookie.replace(/(?:(?:^|.*;\s*)dark\s*\=\s*([^;]*).*$)|^.*$/, "$1") || '0';
    if (night == '0'){
        document.body.classList.add('dark');
        document.cookie = "dark=1;path=/";
        console.log('Dark mode on');
    }else{
        document.body.classList.remove('dark');
        document.cookie = "dark=0;path=/";
        console.log('Dark mode off');
    }
}

(function(){
    if(document.cookie.replace(/(?:(?:^|.*;\s*)dark\s*\=\s*([^;]*).*$)|^.*$/, "$1") === ''){
        if(new Date().getHours() > 22 || new Date().getHours() < 6){
            document.body.classList.add('dark');
            document.cookie = "dark=1;path=/";
            console.log('Dark mode on');
        }else{
            document.body.classList.remove('dark');
            document.cookie = "dark=0;path=/";
            console.log('Dark mode off');
        }
    }else{
        var dark = document.cookie.replace(/(?:(?:^|.*;\s*)dark\s*\=\s*([^;]*).*$)|^.*$/, "$1") || '0';
        if(dark == '0'){
            document.body.classList.remove('dark');
        }else if(dark == '1'){
            document.body.classList.add('dark');
        }
    }
})();