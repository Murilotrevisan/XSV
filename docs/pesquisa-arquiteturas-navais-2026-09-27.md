# XSV — seis propostas de construção para orçamento de R$100

**Complemento quantitativo:** o [estudo interativo em HTML](estudo-comparativo-xsv.html) acrescenta desenhos, curvas de estabilidade, força equivalente, rampa, salto, orçamento ajustável e fontes. As comparações físicas estão condicionadas às premissas documentadas nessa página.

Estudo revisto em 27/09/2026. Esta versão substitui as recomendações e os desenhos anteriores. A revisão usa os requisitos explicitados pelo usuário, sem acrescentar funcionalidades de recuperação, monitoramento ou autonomia.

## Requisitos e limites confirmados

- Orçamento de aproximadamente R$100 para o projeto. O usuário já tem uma ESP32-C5, contabilizada a R$13, e uma impressora 3D. Restam R$87 para os demais componentes e materiais; não presumir motores, bateria, hélices ou driver já disponíveis. O preço da ESP é informação do usuário.
- Ambiente controlado e uso em batalha; virar já implica perda de pontos.
- Fazer a rampa: subir/sair da água e saltar em velocidade.
- Evitar dano à eletrônica por entrada de água durante essas atividades ou uma virada.
- Construção física econômica, com reaproveitamento e soluções simples. Software pode receber mais atenção, sem justificar novos componentes por iniciativa própria.

Não são requisitos: navegar invertido, desvirar sozinho, permanecer flutuando após avaria, recuperar-se sozinho, detectar ingresso de água ou registrar falhas. Não acrescentar sensores, compartimentação, motores duplicados por redundância, lastro de recuperação, quilhas retráteis ou propulsão especial para atender a esses objetivos.

A largura e o perfil da rampa, o modelo exato da placa ESP32-C5, o filamento e as regras detalhadas da batalha ainda não foram informados. As propostas são comparações construtivas, não resultados de ensaios. Não presumir obrigação de parar e retomar a subida em trecho seco, nem adicionar rodas ou esteiras para isso.

## Direção recomendada

**Primeira escolha: prancha de fundo plano. Segunda escolha: catamarã simples de espuma com dois patins.** São os candidatos que eu construiria primeiro, por terem poucos componentes, fundo adaptável à rampa e baixo custo de reposição.

As seis propostas abaixo incluem variantes construtivas de uma mesma família de casco quando essa diferença muda significativamente o reaproveitamento, a montagem ou a resistência. Não são apresentadas como seis famílias navais distintas.

| Proposta | Construção | Principal motivo para escolher | Principal desvantagem |
|---|---|---|---|
| 1. Prancha de fundo plano | Um bloco de espuma com frente arredondada e revestimento simples no fundo | Menor número de peças e contato contínuo com a rampa | Reentrada plana pode dar uma pancada forte |
| 2. Catamarã de dois patins | Dois blocos alongados de espuma unidos por duas travessas | Permite ajustar a largura e usar apoios laterais separados | Travessas e fixações recebem torção quando só um lado toca |
| 3. Monocasco de V raso | Bloco de espuma com fundo em V pouco pronunciado | Alternativa para experimentar uma entrada na água menos abrupta | Mais recorte e apoio menos plano na rampa |
| 4. Catamarã de duas PET | Duas garrafas iguais, fechadas, com travessas reaproveitadas | Aproveita flutuadores já prontos, sem comprar espuma | Formato, nervuras e tampas são piores para deslizar na rampa |
| 5. Trimaran compacto | Casco central de espuma e dois flutuadores pequenos próximos | Opção intermediária para aproveitar uma base central estreita | Mais peças e mais pontos de contato, sem ganho garantido |
| 6. Monocasco impresso tipo bandeja/esqui | Casco aberto e raso, com frente curva, feito na impressora disponível | Forma reproduzível e suportes integrados | Consome filamento e pesa mais que uma peça equivalente de espuma |

## 1. Prancha de fundo plano — favorita pelo custo

**Forma:** peça única, larga, baixa, com frente arredondada ou inclinada e fundo longitudinal contínuo. Não precisa de simetria entre cima e baixo.

**Material:** espuma firme de embalagem ou retalho disponível; fita larga para acabamento e, onde necessário, uma lâmina fina de plástico reaproveitado como superfície de desgaste. Usar adesivo compatível com a espuma disponível.

**Rampa e batalha:** o próprio fundo serve de superfície de apoio. O corpo único dispensa travessas e braços. Manter bateria e recipiente eletrônico baixos e bem presos.

**Compromisso:** uma reentrada com o fundo todo plano pode transmitir uma pancada forte. Não prometer velocidade nem capacidade de salto antes de experimentar o conjunto real.

**Escolher quando:** queremos começar rápido e gastar o mínimo no casco, deixando orçamento para a parte elétrica.

## 2. Catamarã de espuma com dois patins — favorito para comparar

**Forma:** dois cascos alongados com frente curvada, unidos por duas travessas curtas de madeira ou plástico reaproveitado. A garrafa ou o pote da eletrônica fica entre eles, acima do contorno que toca a rampa.

**Material:** dois retalhos de espuma firme, duas travessas, fita ou abraçadeiras e pequenos reforços locais de plástico. A impressora pode produzir encaixes e suportes pequenos, contabilizando o filamento.

**Rampa e batalha:** cada casco funciona como um patim. A largura pode ser alterada sem refazer o casco, respeitando a largura da rampa e eventuais limites da competição. A posição da ponte precisa permitir a passagem pela mudança de inclinação.

**Compromisso:** contato ou pouso de um lado antes do outro solicita as travessas e suas fixações. Evitar uma plataforma pesada ou alta entre os cascos.

**Escolher quando:** a facilidade de ajustar a largura compensa algumas peças a mais. Não adicionar propulsão para operar invertido.

## 3. Monocasco de V raso — alternativa para o pouso

**Forma:** casco único, sem quilha, com um V discreto no fundo e transição suave na proa. A região mais baixa é o próprio casco, sem apêndice pendurado.

**Material:** bloco de espuma recortado, fita e uma faixa de plástico reaproveitado na região de contato, se o desgaste justificar.

**Rampa e batalha:** mantém uma forma contínua para atravessar a rampa. É uma alternativa para comparar como a geometria distribui o impacto na reentrada.

**Compromisso:** há mais trabalho de corte; um V mais profundo piora o objetivo de ter pouco corpo abaixo da água e apoio simples na rampa. Não transformar esta opção num casco de mar aberto nem adicionar lastro para endireitamento.

**Escolher quando:** os primeiros testes mostrarem que a pancada de reentrada da prancha plana merece uma mudança de formato. A melhora precisa ser observada no protótipo.

## 4. Catamarã com duas garrafas PET — favorito para reaproveitar

**Forma:** duas garrafas iguais, fechadas e deitadas, ligadas por travessas leves. Usar outra garrafa ou pote acessível para a eletrônica.

**Material:** garrafas usadas, travessas reaproveitadas ou impressas, fita e abraçadeiras. Escolher garrafas de formato regular e fixá-las para não girarem nas travessas. Encaixes impressos podem simplificar a montagem, desde que leves e baratos.

**Rampa e batalha:** o custo de matéria-prima pode ser quase nulo se tudo já estiver disponível. Para contato com a rampa, pode ser necessário cobrir a região inferior com uma tira lisa de plástico reutilizado que ultrapasse os relevos que poderiam prender.

**Compromisso:** garrafas não têm um fundo desenhado para deslizar; suas nervuras, ombros e tampas podem atrapalhar. A montagem pronta também pode ficar mais volumosa que a versão de espuma. Reforços que se acumulem podem eliminar a vantagem de simplicidade.

**Escolher quando:** garrafas e travessas já estão disponíveis e queremos um protótipo econômico imediato. Não é minha primeira escolha para a rampa se houver espuma disponível.

## 5. Trimaran compacto — alternativa para aproveitar uma base

**Forma:** casco central de espuma levando a eletrônica, com dois flutuadores laterais menores e próximos. Os braços devem ser curtos; todos os contatos previstos com a rampa devem encontrar superfícies que deslizem.

**Material:** uma peça central e dois pequenos retalhos de espuma, unidos com travessas reaproveitadas.

**Rampa e batalha:** pode aproveitar um casco central estreito que já esteja pronto, adicionando apoio lateral. A utilidade aqui é reaproveitar material, não buscar uma arquitetura naval sofisticada.

**Compromisso:** mais fixações, três regiões de contato e possibilidade de torção ao tocar desalinhado. Não há razão para pressupor menor consumo ou melhor desempenho que o catamarã simples.

**Escolher quando:** já existe uma peça central aproveitável. Para construir tudo do zero, prefiro as propostas 1 ou 2.

## 6. Monocasco impresso tipo bandeja/esqui — alternativa para usar a impressora

**Forma:** casco único, raso e aberto em cima, com fundo plano e proa curva. O próprio desenho pode integrar o apoio da garrafa e os encaixes dos motores. O recipiente PET continua responsável por manter a eletrônica seca; não criar uma tampa impressa estanque.

**Material:** filamento da impressora disponível e o recipiente reutilizado. Contabilizar o consumo indicado pelo fatiador antes de imprimir. Exemplo puramente aritmético: 80 g de um filamento que custe R$100/kg representam R$8; isso não é cotação nem massa de um modelo já dimensionado.

**Rampa e batalha:** permite desenhar diretamente a curva de entrada da rampa e reproduzir peças. Manter a construção simples, sem quilha, degrau no fundo ou suportes pendurados abaixo dele.

**Compromisso:** o casco precisa reter água do lado de fora durante o uso normal para não ir enchendo, mesmo que a eletrônica esteja em PET. Massa, resistência ao impacto e possíveis vazamentos dependem do material e da impressão. O recipiente independente evita que seja necessário aperfeiçoar uma caixa eletrônica impressa, mas não elimina a necessidade de o casco funcionar como barco.

**Escolher quando:** o modelo couber no orçamento de filamento e a facilidade de imprimir compensar o peso e o tempo de fabricação. Para o primeiro teste, ainda prefiro espuma com pequenos suportes impressos.

## Eletrônica em PET: solução simples aceita

Uma garrafa PET íntegra com tampa, ou um pote reaproveitado com fechamento adequado, é a primeira solução a experimentar. Escolher uma abertura pela qual a placa e a bateria possam entrar; evitar cortar o corpo da garrafa para depois reconstruir a vedação.

Manter o fechamento original, fazer somente as passagens de fios necessárias e vedá-las. Prender o recipiente com fita ou abraçadeiras. O casco não precisa virar uma caixa estanque se a eletrônica já está no recipiente.

Verificação proporcional ao projeto: colocar papel seco no recipiente, fechar, molhar e mergulhar brevemente nas orientações esperadas; conferir o papel antes de instalar a eletrônica. Isso verifica a montagem barata que realmente será usada, sem sensores ou instrumentação adicional. A estanqueidade depende especialmente da tampa e dos furos feitos para os fios; a garrafa não garante vedação depois de modificada.

A proteção do recipiente não torna os motores expostos impermeáveis. A escolha e o comportamento deles após uma molhada dependem das peças disponíveis; não presumir que todo motor de brinquedo sobreviverá só porque a placa está dentro da garrafa. Não há seleção de motor fechada neste estudo.

## Propulsão: escolha comum, separada do formato do casco

Para manter o fundo livre, investigar **hélice no ar, como em um aerobarco**, usando o conjunto mais econômico disponível. Isso evita eixo atravessando o recipiente e hélice abaixo do casco; não precisa de hidrojato.

Dois pequenos motores com controle independente podem permitir direção por diferença de empuxo e dispensar um servo de leme. Como o usuário ainda não tem motores nem servo, comparar o custo completo das duas configurações. Escolher pelo conjunto que realmente custa menos e entrega empuxo suficiente, não por uma regra de duplicação de motores. Usar a ESP32-C5 existente para o controle; a compra de rádio dedicado não foi estabelecida como requisito.

Propulsão aérea também impõe compromissos: montagem e hélice ficam acima do casco, podem receber contatos na batalha, e o empuxo de motores pequenos pode ser insuficiente para a rampa. A hélice deve ter espaço para girar sem tocar a estrutura. Não declarar que o barco sobe ou salta antes de experimentar com a bateria, o motor, a massa e a rampa reais.

Hélice aquática continua possível se um conjunto econômico tiver montagem compatível com a rampa. O princípio é comparar a solução completa e não impor uma compra mais cara para cumprir uma preferência de arquitetura. Não escolher driver ou alimentação só pelo preço: a compatibilidade depende do motor sob carga e da placa ESP efetivamente disponível.

## Orçamento e decisão

**R$100 totais = R$13 da ESP32-C5 + R$87 para o restante.** A impressora é ferramenta já disponível; contabilizar o filamento consumido e os materiais.

Distribuição-meta para comparar as propostas; não é lista de compras fechada:

| Grupo | Limite de planejamento |
|---|---:|
| ESP32-C5, valor informado pelo usuário | R$13 |
| Motores e hélices | R$18 |
| Driver dos motores | R$9 |
| Bateria, recarga e adequação da alimentação | R$27 |
| Casco, filamento, fios, fixação e vedação | R$18 |
| Frete ou ajustes de compra | R$15 |
| Total | R$100 |

Referências de preço consultadas em 27/09/2026: [motor DC 130 na Optimus](https://www.lojaoptimusrobotica.com.br/motor-dc-3-volts), R$6 por unidade; [DRV8833 na Ardushop](https://www.ardushop.com.br/produto/driver-drv8833-motor-dc-ou-passo), R$5,95. São referências de ordem de custo, sem frete, e não confirmam empuxo suficiente nem a compatibilidade de um conjunto ainda não selecionado. Os demais valores da tabela são metas a cotar. Procurar concentrar compras, pois fretes separados podem inviabilizar o teto.

Reaproveitar materiais de embalagem e escolher as dimensões depois de definir e pesar a parte elétrica. Evitar comprar material para as seis opções: começar pela prancha plana e usar o mesmo conjunto elétrico numa segunda geometria somente se houver motivo observado nos testes. Usar a impressora principalmente para suportes pequenos nas propostas 1 a 5; a proposta 6 permite comparar a impressão do casco completo.

A escolha recomendada é **prancha plana + recipiente PET + propulsão econômica disponível**. O catamarã de dois patins fica como a principal alternativa. O critério de aprovação é conseguir fazer as atividades previstas e manter a eletrônica seca; nenhum requisito de sobrevivência a avaria ou recuperação autônoma foi acrescentado.

## Referências usadas e limites

- [TeacherGeek/Pitsco — Build-a-Boat](https://asset.pitsco.com/sharedimages/resources/boat_go_guide.pdf): atividade do fabricante que usa motor e materiais como espuma, garrafas e recipientes reaproveitados. Sustenta o caminho construtivo simples; não demonstra batalha, rampa ou custo de R$100.
- [CompuCat — DIY Airboat and Controller](https://hackaday.io/project/2359-diy-airboat-and-controller/details): relato do próprio construtor de um aerobarco com base de espuma reaproveitada. A eletrônica e a motorização desse exemplo não são a lista de compras proposta para o XSV.
- [Science Buddies — Build an RC Boat](https://www.sciencebuddies.org/science-fair-projects/project-ideas/Robotics_p055/robotics/build-an-arduino-rc-boat): exemplo educacional que utiliza recipiente plástico na construção de um barco controlado. Referência de abordagem, sem recomendação de comprar seus propulsores ou kit.
- [Boat Ed — Planing Hulls](https://www.boat-ed.com/kansas/studyGuide/Planing-Hulls/10101701_138939/): distinção entre fundos planos e em V e comportamento de planeio. Não comprova que o XSV atingirá esse regime.

As comparações de custo, montagem e adequação das seis propostas são avaliações conceituais para os requisitos informados, não medições publicadas dessas seis construções.
