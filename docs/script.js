// Selecao de elementos
let valor_inicial = document.getElementById('valor_inicial')
let valor_mensal = document.getElementById('valor_mensal')
let taxa_juros = document.getElementById('taxa_juros')
let periodo = document.getElementById('periodo')
let comando_calcular = document.getElementById('comando_calcular')
let comando_limpar = document.getElementById('comando_limpar')
let resultado_valor_final = document.getElementById('resultado_valor_final')
let resultado_valor_investido = document.getElementById('resultado_valor_investido')
let resultado_valor_juros = document.getElementById('resultado_valor_juros')
let box_resultado = document.getElementById('box-principal-resultado')

function formatarMoeda(valor){
    return (Number(valor) / 100).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })
}

function formataPorcentagen(valor){
    return (Number(valor) / 100).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
    }) + ' %'
}

function limparMoeda(valor){
    return Number(
        valor.replace(/\s/g, '')
             .replace('R$', '')
             .replace(/\./g, '')
             .replace(',', '.')

    )
}

function limparPorcentagem(valor){
    return Number(
        valor.replace('%', '')
             .replace(/\./g, '')
             .replace(',', '.')
    )
}

// Formatacao enquanto digita (valor_inicial)
valor_inicial.addEventListener('input', ()=>{
    let valor = valor_inicial.value.replace(/\D/g, '')

    valor_inicial.value = formatarMoeda(valor)
})

// Formatacao enquanto digita (valor_mensal)
valor_mensal.addEventListener('input', ()=>{
    let valor = valor_mensal.value.replace(/\D/g, '')

    valor_mensal.value = formatarMoeda(valor)
})

// Formatacao enquanto digita (taxa_juros)
taxa_juros.addEventListener('input', ()=>{
    let valor = taxa_juros.value.replace(/\D/g, '')


    taxa_juros.value = formataPorcentagen(valor)
})

// Calcular resultado
comando_calcular.addEventListener('click', ()=>{
    let v_inicial = limparMoeda(valor_inicial.value)
    let v_mensal = limparMoeda(valor_mensal.value)
    let t_juros = (limparPorcentagem(taxa_juros.value)) / 100
    let p = Number(periodo.value)

    if (isNaN(v_inicial) || isNaN(v_mensal) || isNaN(t_juros) || isNaN(p) || p <= 0){
        alert('Por favor, preencha todos os campos corretamente.')
    }else{
        let montante = v_inicial * ((1 + t_juros) ** p) + v_mensal * ((((1 + t_juros) ** p) - 1) / t_juros)

        let principal = (v_mensal * p) + v_inicial

        let juros = montante - principal

        montante = montante.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        })

        principal = principal.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        })

        juros = juros.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        })

        box_resultado.style.display = 'block'
        resultado_valor_final.innerHTML = `<p>Montante</p><p>${montante}</p>`
        resultado_valor_investido.innerHTML = `<p>Principal</p><p>${principal}</p>`
        resultado_valor_juros.innerHTML = `<p>Valor em juros</p><p>${juros}</p>`
    }
})

// Botao limpar
comando_limpar.addEventListener('click', ()=>{
    valor_inicial.value = ''
    valor_mensal.value = ''
    taxa_juros.value = ''
    periodo.value = ''
    box_resultado.style.display = 'none'
})
