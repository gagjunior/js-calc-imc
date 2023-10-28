
(function calculadoraIMC() {
    const formulario = document.querySelector('#form')
    const peso = formulario.querySelector('#peso')
    const altura = formulario.querySelector('#altura')
    const resultado = document.querySelector('.resultado')

    formulario.addEventListener('submit', function (event) {
        event.preventDefault()
        const imc = calculoIMC(peso.value, altura.value)
        
        if (isError(peso.value, altura.value, imc)) {
            printError(peso.value, altura.value, imc)
        } else {
            printResultado(peso.value, altura.value, imc)
            limparDados()
        }

    })

    function calculoIMC(peso, altura) {
        const resultado = peso / (altura * altura)
        return resultado
    }

    function printResultado(peso, altura, imc) {
        resultado.innerHTML = ''

        const msg = imcResult(imc)

        resultado.appendChild(createP(`Peso: ${peso}`))
        resultado.appendChild(createP(`Altura: ${altura}`))
        resultado.appendChild(createP(`IMC: ${imc}`))
        resultado.appendChild(msg)

    }

    function isError(peso, altura, imc) {
        if (validateHeight(altura) !== 'OK') {
            return true
        } else if (validateWeight(peso) !== 'OK') {
            return true
        } else if (validateIMC(imc) !== 'OK') {
            return true
        } else {
            return false
        }
    }

    function printError(peso, altura, imc) {
        resultado.innerHTML = ''

        const msgAltura = validateHeight(altura)
        const msgPeso = validateWeight(peso)
        const msgIMC = validateIMC(imc)

        if (msgAltura !== 'OK') {
            resultado.appendChild(createP(`Altura: ${msgAltura}`))
        }
        if (msgPeso !== 'OK') {
            resultado.appendChild(createP(`Peso: ${msgPeso}`))
        }
        if (msgIMC !== 'OK') {
            resultado.appendChild(createP(`IMC: ${msgIMC}`))
        }

    }

    function createP(textoP) {
        const paragrafo = document.createElement('p')
        paragrafo.innerHTML = textoP
        return paragrafo
    }

    function imcResult(imc) {
        let msg = ''
        let style = ''
        if (imc <= 18.5) {
            msg = 'Abaixo do peso'
            style = 'warning-imc'
        } else if (imc <= 24.9) {
            msg = 'Peso normal'
            style = 'normal-imc'
        } else if (imc <= 29.9) {
            msg = 'Sobrepeso'
            style = 'warning-imc'
        } else if (imc <= 34.9) {
            msg = 'Obesidade Grau 1'
            style = 'danger-imc'
        } else if (imc <= 40) {
            msg = 'Obesidade Grau 2'
            style = 'danger-imc'
        } else {
            msg = 'Obesidade Grau 3'
            style = 'danger-imc'
        }

        const paragrafo = createP(msg)
        paragrafo.classList.add(style)
        return paragrafo
    }

    function validateHeight(altura) {
        if (isNaN(altura)) {
            return 'Valor digitado para altura não é um numero'
        } else if (altura < 0.1) {
            return 'Digite um valor maior que 0.1'
        } else if (altura > 3) {
            return 'Altura inválida. O valor deve estar entre 0.1 e 3 metros'
        } else {
            return 'OK'
        }
    }

    function validateWeight(peso) {
        if (isNaN(peso)) {
            return 'Valor digitado para o peso não é um numero'
        } else if (peso <= 0) {
            return 'Digite um valor maior que zero'
        } else if (peso > 700) {
            return 'Peso inválido. O valor deve estar entre 0.01 e 700 Kg'
        } else {
            return 'OK'
        }
    }

    function validateIMC(imc) {
        if (isNaN(imc)) {
            return 'Não foi possivel calcular o IMC com os valores fornecidos!'
        } else if (imc < 0) {
            return 'IMC negativo(-). Não foi possivel calcular o IMC com os valores fornecidos!'
        } else {
            return 'OK'
        }
    }

    function limparDados() {
        peso.value = ''
        altura.value = ''
    }
})()