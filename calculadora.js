const resultado = document.getElementById("resultado");
const html = document.documentElement

const historicoResultados = JSON.parse(sessionStorage.getItem('historicoContas')) || []
const historicoOperacoes = JSON.parse(sessionStorage.getItem('historicoOperacao')) || []



function add(x) {
    if (resultado.value === '0') {
        resultado.value = ''
    }
    const operadores = ['+', '-', '*', '/']
    if (operadores.includes(x)) {
        for (let i = 0; i < operadores.length; i++) {
            if (resultado.value.endsWith(operadores[i])) {
                resultado.value = resultado.value.slice(0, -1,)
                break       //!!! dai acaba o for e executa o resultado.value +=x
            }
        }
    }


    return resultado.value += x
}

function c() {
    resultado.value = ""
}

function porcentagem() {
    const parenteses = resultado.value
    resultado.value = 0
    resultado.value = `${parenteses}/100`
}

function ce() {
    const cezada = resultado.value.slice(0, -1)
    resultado.value = cezada
}

function igual() {
    const operadores = ['+', '-', '*', '/']
    if (resultado.value === '') {
        return
    };
    if (/\/0(?!\d)/.test(resultado.value)) {
        resultado.value = "0"
        return;
    }
    const continha = {
        operacao: resultado.value
    }

    if (operadores.some(op => resultado.value.includes(op))) {  // !!!!!!!!!!!!!!
        continha.operacao = resultado.value
        resultado.value = eval(resultado.value);
        if (resultado.value == 67) {
            const gif = document.querySelector(".six__seven");
            gif.style.display = "block";
        }
    } else {
        resultado.value = `${resultado.value}*2`
        console.log(resultado.value);
        continha.operacao = resultado.value
        resultado.value = eval(resultado.value);
    }

    const resultados = {
        resultado: resultado.value
    }

    historicoResultados.push(resultados);
    historicoOperacoes.push(continha);

    criaLinhaHistorico(resultados, continha);     //!!!!!!!!!!!!!!!!!!!!

    atualizarHistorico()
}

function mudaSinal() {
    if (resultado.value.startsWith("-")) {
        resultado.value = resultado.value.slice(1) //
    } else {
        resultado.value = "-" + resultado.value
    }
}

//cliques

function htmlEvent(funcao, clicada) {
    if (resultado.value !== "") {
        clicada.preventDefault()
        funcao()
    }
}

html.addEventListener("keypress", (clicada) => {
    if (clicada.key === 'Enter') {
        htmlEvent(igual, clicada)
    }
})

html.addEventListener("keydown", (clicada) => {
    if (clicada.key === 'Backspace') {
        htmlEvent(ce, clicada)
    }
})

html.addEventListener("keydown", (clicada) => {
    if (clicada.key === 'c') {
        htmlEvent(c, clicada)
    }
})

html.addEventListener("keydown", (clicada) => {
    if (clicada.key === 'x') {
        add('*')
    }
})

html.addEventListener("keydown", (clicada) => {
    if (clicada.key === ',') {
        if (resultado.value === '') {
            clicada.preventDefault()
            add('0.')
        } else {
            clicada.preventDefault()
            add('.')
        }

    }
})

html.addEventListener("keydown", (clicada) => {
    if (clicada.key === 'Alt') {
        htmlEvent(mudaSinal, clicada)
    }
})
html.addEventListener("keydown", (clicada) => {
    if (clicada.key === '%') {
        htmlEvent(porcentagem, clicada)
    }
})

const numeros = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '/']

html.addEventListener("keydown", (numerada) => {
    if (numeros.includes(numerada.key)) {
        numerada.preventDefault()
        return add(numerada.key)
    }
})


// /cliques

//historico

function atualizarHistorico() {
    sessionStorage.setItem("historicoContas", JSON.stringify(historicoResultados));
    sessionStorage.setItem("historicoOperacao", JSON.stringify(historicoOperacoes));

}

function criaLinhaHistorico(resultados, continha) {
    const ul = document.querySelector(".ul__historico")

    const li = document.createElement('li')
    li.classList.add("li__historico")

    const p = document.createElement('p')
    p.textContent = `${continha.operacao}=${resultados.resultado}`


    ul.append(li)
    li.append(p)
}

const apaga = document.querySelector("#apaga")

function apagarHistorico() {
    const ul = document.querySelector(".ul__historico")
    ul.innerHTML = "";
    sessionStorage.clear()
    atualizarHistorico()
    resultado.value = "";
}

function historicoDisplayFunction() {
    const historicoDisplay = document.querySelector(".historico")
    if (historicoDisplay.style.display == "none") {
        historicoDisplay.style.display = "block"
    } else {
        historicoDisplay.style.display = "none"
    }
}

function tutorialDisplay() {
    const tutorial = document.querySelector('.como__usar')
    if (tutorial.style.display == "none") {
        tutorial.style.display = "block"
    } else {
        tutorial.style.display = "none"
    }

}


