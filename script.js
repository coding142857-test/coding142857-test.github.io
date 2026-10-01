const title = {
    '0. 國文': [
        '第一課'
    ],
    '1. 英文': [
        'Unit1'
    ],
    '2. 數學': [
        '1-1 數與式'
    ],
    '3. 物理': [
        '1-1'
    ],
    '4. 化學': [
        '1-1'
    ],
    '5. 地科': [
        '1-1'
    ],
    '6. 地理': [
        '1-1'
    ],
    '7. 歷史': [
        '1-1'
    ],
    '8. 公民': [
        '1-1 公民身分與權利內涵演變',
        '1-2 我國各項公民權利如何發展與落實'
    ],
}

var qua, ans, level, cerrect, isCheck;



function initial() {
    ans = '';
    level = 0;
    cerrect = 0;
    isCheck = false;
    let fileName = document.getElementById('fileName');
    let lc = 0;
    for (const type in title) {
        let optgroup = document.createElement('optgroup');
        optgroup.label = type;
        let nc = 0;
        for (const name of title[type]) {
            let option = document.createElement('option');
            option.value = `${lc.toString(16)}${nc.toString(16).padStart(3, '0')}`;
            option.innerText = name;
            optgroup.appendChild(option);
            nc++;
        }
        fileName.appendChild(optgroup);
        lc++;
    }
}

function gets() {
    console.log(fileName.value);
    if (fileName.value !== 'init') {
        qua = JSON.parse(Quas[fileName.value]);
        document.getElementById('init').className = 'divHide';
        document.getElementById('main').className = 'divShow';
        document.getElementById('mainTitle').innerHTML = qua.title;

        let element;
        element = document.createElement('span');
        element.innerHTML = `共 ${qua.count} 題 - ${qua.type === 'choose'?'選擇':'非選'}題`;
        document.getElementById('mainIndex').appendChild(element);

        document.getElementById('mainIndex').appendChild(document.createElement('br'));

        element = document.createElement('button');
        element.innerHTML = '開始作答';
        element.onclick = start;
        document.getElementById('mainIndex').appendChild(element);

    }
}

function resize() {
    document.querySelector('.divShow').width = window.innerWidth;
    document.querySelector('.divShow').height = window.innerHeight;
}

resize();

function start() {
    loadLevel(level);
};

function loadLevel(level) {
    if (level >= qua.count) {
        finished();
        return;
    }

    document.getElementById('mainIndex').innerHTML = '';

    let element;
    element = document.createElement('span');
    element.innerHTML = qua.index[level][0];
    document.getElementById('mainIndex').appendChild(element);

    document.getElementById('mainIndex').appendChild(document.createElement('br'));

    ans = '';

    if (qua.type === 'choose') {
        for (index of['A', 'B', 'C', 'D']) {
            element = document.createElement('button');
            element.innerHTML = qua.index[level][1][index];
            element.tag = index;
            element.id = index;
            element.onclick = function() {
                if (isCheck) return;
                if (ans !== '') document.getElementById(ans).classList.remove('select');
                ans = this.tag;
                document.getElementById(ans).classList.add('select');
            }
            document.getElementById('mainIndex').appendChild(element);
        }

        document.getElementById('mainIndex').appendChild(document.createElement('br'));

        element = document.createElement('button');
        element.id = 'test';
        element.innerHTML = '確認';
        element.onclick = function() {
            if (ans === '') return;
            isCheck = true;
            if (ans === qua.index[level][2]) {
                cerrect++;
                document.getElementById(ans).classList.remove('select');
                document.getElementById(ans).classList.add('cerrect');
                document.getElementById(ans).innerHTML += '<img src="cerrect.png" class="icon">';
            } else {
                document.getElementById(ans).classList.remove('select');
                document.getElementById(ans).classList.add('false');
                document.getElementById(ans).innerHTML += '<img src="false.png" class="icon">';
                document.getElementById(qua.index[level][2]).classList.add('cerrect');
                document.getElementById(qua.index[level][2]).innerHTML += '<img src="cerrect.png" class="icon">';
            }
            document.getElementById('mainIndex').appendChild(document.createElement('br'));

            let element;
            element = document.createElement('span');
            element.innerHTML = qua.index[level][3];
            document.getElementById('mainIndex').appendChild(element);

            this.innerHTML = '下一題';
            this.onclick = function() {
                isCheck = false;
                loadLevel(++level);
            };
        };
        document.getElementById('mainIndex').appendChild(element);
    }
}

function finished() {
    document.getElementById('mainIndex').innerHTML = '';

    let element;
    element = document.createElement('span');
    element.innerHTML = '完成';
    document.getElementById('mainIndex').appendChild(element);

    document.getElementById('mainIndex').appendChild(document.createElement('br'));

    element = document.createElement('span');
    element.innerHTML = `答對: ${cerrect} / ${qua.count} 題`;
    document.getElementById('mainIndex').appendChild(element);

    document.getElementById('mainIndex').appendChild(document.createElement('br'));

    element = document.createElement('button');
    element.innerHTML = `重新`;
    element.onclick = function() {
        document.body.innerHTML = `
        <div id="init" class="divShow">
            <span id="initTitle">選擇題目</span>
            <form id="form">
                <select name="fileName" id="fileName" autocomplete="on">
                    <option value="init" selected>--selected--</option>
                </select>
            </form>
            <button onclick="gets();">確認</button>
            <br>
            <button onclick="mode('dark');" id="mode">深色模式</button>
        </div>
        <div id="main" class="divHide">
            <span id="mainTitle"></span>
            <div id="mainIndex"></div>
        </div>`;
        initial();
    };
    document.getElementById('mainIndex').appendChild(element);

}

function mode(type) {
    if (type === 'dark') {
        document.documentElement.classList.add('dark');
        document.getElementById('mode').innerHTML = '淺色模式';
        document.getElementById('mode').onclick = function() { mode('light'); };
    } else {
        document.documentElement.classList.remove('dark');
        document.getElementById('mode').innerHTML = '深色模式';
        document.getElementById('mode').onclick = function() { mode('dark'); };
    }
}

document.addEventListener('keydown', (e) => {
    if (/1|a|A/.test(e.key)) document.getElementById('A').click();
    if (/2|b|B/.test(e.key)) document.getElementById('B').click();
    if (/3|c|C/.test(e.key)) document.getElementById('C').click();
    if (/4|d|D/.test(e.key)) document.getElementById('D').click();
    if (/Enter/.test(e.key)) document.getElementById('test').click();
})

document.addEventListener('contextmenu', (e) => { e.preventDefault(); });
document.addEventListener('selectstart', (e) => { e.preventDefault(); });
document.addEventListener('dragstart', (e) => { e.preventDefault(); });

initial();