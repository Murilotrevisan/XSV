# Estudo quantitativo do XSV

Abra `../estudo-comparativo-xsv.html` diretamente no navegador. O arquivo reúne CSS, JavaScript, desenhos SVG e cálculo, sem conexão com serviços externos. Também existe a versão de desenvolvimento em `index.html`.

O HTML compara seis construções, resolve o equilíbrio hidrostático de seções prismáticas e estima energia para uma rampa idealizada. Os resultados dependem das hipóteses editáveis; não validam casco, propulsão ou lista de compras. A página documenta as simplificações, unidades e fontes.

## Reproduzir

```sh
node --test docs/estudo-xsv/model.test.cjs
node docs/estudo-xsv/build.cjs
```

`model.js` contém o cálculo independente da interface. `app.js` contém os gráficos e controles. `cenario-base.json` guarda resultados e curvas, gerados pelo mesmo código usado no HTML. O botão de exportação grava CSV do cenário exibido.

Os testes verificam: área e centroide; calado e GM analíticos de um prisma retangular; conservação de deslocamento; simetria; efeito de deslocar o centro de massa; aproximação de círculos; convergência angular; interrupção da bandeja na borda imersa; trabalho e energia; trajetória balística; orçamento; extremos dos controles. Esses testes verificam implementação matemática, não precisão experimental.

## Leitura dos números-base

- Envelope de 300 × 240 mm; 180 g comuns de parte elétrica e recipiente; estrutura calculada separadamente.
- Catamarã: aproximadamente 0,216 N·m de momento restaurador máximo, contra 0,186 N·m da prancha. A força equivalente de 4,32 N usa braço **constante** de 50 mm; não representa força de colisão.
- Rampa: 20°, 100 mm, atrito 0,15, retenção de energia de 75% e empuxo hipotético de 0,30 N. Catamarã exige aproximadamente 1,65 m/s de entrada, ou 1,13 N para manter subida sem depender do embalo.
- R$83,95 para o catamarã é um orçamento com metas de compra, não uma cotação completa. Empuxo, alimentação e corrente sob carga permanecem sem validação.
