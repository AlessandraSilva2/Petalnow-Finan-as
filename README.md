PetalNow - Finanças Offline  

Sobre o Projeto  
O PetalNow é um site educativo de finanças pessoais e controle de serviços.  
Ele ajuda estudantes e profissionais a gerenciar receitas, custos e metas mensais de forma prática e offline.  

O site simula uma gestão financeira real, usando valores que você realmente vive como metas financeiras.  

Acesse o site:

Profissionais  
O PetalNow é útil para diferentes perfis de usuários:  

Estudantes: Aprendem conceitos de finanças, como controlar gastos, definir metas e calcular lucros.  
Profissionais que vendem serviços ou produtos: Muitas vezes oferecem mão de obra barata, enquanto clientes gastam muito com produtos caros ou reclamam na hora de pagar.  
Exemplos:  
Técnicos de refrigeração  
Mecânicos  
Cabeleireiros  
Manicures  
Pintores, eletricistas e outros prestadores de serviços  

O site ajuda esses profissionais a registrar seus serviços, custos e lucros reais, garantindo que saibam quanto cobrar e como atingir suas metas financeiras.  

Educadores ou Mentores: Podem usar o site para ensinar noções de gestão financeira de forma prática.  

Como Usar  
1. Definir Meta Mensal → Esse é o primeiro passo. Digite o valor que você precisa lucrar no mês.  

2. Registrar Serviço → Adicione cliente, produto e peça utilizada (se houver).  

3. Adicionar Custos → Inclua os gastos relacionados a cada serviço.  

4. Inserir Faturamento → Coloque o valor recebido pelo serviço.  

5. Adicionar Imprevistos → Registre despesas inesperadas que diminuem o lucro.  

6. Acompanhar Resultados → Veja em tempo real o faturamento, custos, lucro e quanto falta para atingir a meta.  

7. Baixar PDF → Gere um relatório completo do dia com faturamento, custos, lucro e imprevistos.  

O site calcula automaticamente o **lucro do dia** e mostra quanto falta para atingir sua meta mensal.  


Diferenciais  
Offline: Não precisa de internet após o primeiro carregamento.  
Funciona em celulares: Interface responsiva, acessível em qualquer dispositivo.  
Valores Reais: Você define quanto realmente precisa para alcançar suas metas financeiras.  
Simples e Didático: Interface intuitiva pensada para estudantes do Fundamental 2.  
Controle Visual: Barras de resumo para faturamento, custos e lucro.  
Exportável: Baixe seus dados em PDF para análise ou estudo.  
Salvamento Automático: Serviços, custos, imprevistos e metas ficam salvos no navegador.  
Metas Financeiras: A meta mensal é definida logo na primeira vez e já fica salva automaticamente.  

Como os Valores São Tratados  
Os valores no site são reais, no sentido de refletirem suas metas e gastos diários.  

Exemplo:  

| Item              | Valor   |
|-------------------|---------|
| Meta mensal       | R$ 2.000 |
| Faturamento do dia| R$ 250  |
| Custos do dia     | R$ 100  |
| Lucro do dia      | R$ 150  |
| Faltante p/ meta  | R$ 1.850 |

O site ainda calcula quantos serviços iguais ao último seriam necessários para alcançar a meta.  

Tecnologias Usadas  
HTML5 → Estrutura da página  
CSS3 → Estilo visual e layout responsivo  
JavaScript → Lógica do site e cálculos financeiros  
LocalStorage → Salvar dados offline no navegador  
jsPDF → Gerar relatórios em PDF offline  

Estrutura do Projeto  

/index.html -> Página principal
/style.css -> Estilos do site
/script.js -> Lógica e funcionalidades
/libs/jspdf.umd.js -> Biblioteca para gerar PDF offline
/imagens/ -> Arquivos de imagem


Fotos do Sistema  

Tela da Meta  
<img width="600" alt="Tela da Meta" src="https://github.com/user-attachments/assets/ccd3dfb7-2899-465c-9ab7-361fa3e0d2df" />  

Tela de Serviços  
<img width="600" alt="Tela de Serviços" src="https://github.com/user-attachments/assets/a002711c-0945-42a7-bf53-d6b3d8c2922f" />  

Tela Final e Relatório PDF  
<img width="600" alt="Tela Final e Relatório PDF" src="https://github.com/user-attachments/assets/1d5d2725-3649-4749-ac8d-a9f6f39c8925" />  

Como o cálculo da meta funciona

O sistema calcula quantos serviços do mesmo tipo você precisa fazer para atingir sua meta diária. Primeiro, ele olha para o lucro do último serviço realizado. Por exemplo, se o último serviço foi da Fátima e deu R$ 100 de lucro, esse é o valor que ele vai usar no cálculo.

Depois, ele descobre quanto ainda falta para chegar na meta. Se a meta do dia é R$ 2.000 e você já acumulou R$ 70 de lucro, então falta R$ 1.930.

Então, ele divide o valor que falta pelo lucro do último serviço:

1.930 ÷ 100 = 19,3


Como você não pode fazer um serviço “quebrado”, o sistema usa Math.ceil(), que sempre arredonda o número para cima. Assim, mesmo que 19 serviços dariam R$ 1.900, ainda faltaria para completar a meta, então ele indica 20 serviços.

Resultado final: o sistema mostra “Faltam 20 serviços iguais ao último”, garantindo que você alcance ou ultrapasse a meta diária.

Como Rodar Localmente  
1. Clone este repositório:  
   ```bash
   git clone https://github.com/AlessandraSilva2/Petalnow-Finan-as.git
