# Boas práticas no Angular

> Todo o conteúdo é uma ramificação do artigo [Melhores práticas Angular para adaptar de kateb.fedy](https://medium.com/@kateb.fedy/angular-best-practices-to-adapt-4c7687b16c85).

Este documento visa destacar as melhores práticas de Angular que assegurariam uma implementação óptima através da utilização do projeto Angular para um melhor desempenho.

## 1. Utilizar o CLI.

A CLI simplifica o seu processo global. Assim, quando utiliza a CLI para as suas aplicações Angular, deve conhecer as funções básicas da Angular CLI.

- `npm install -g @angular/cli` para instalar usando NPM

- `ng new my-app` para criar uma nova aplicação

- `ng serve` para executar a aplicação

- `ng generate` para gerar componentes, diretivas, pipes, serviços e classes

- `ng build` para construir o projeto para produção

- `ng lint` para executar o linter

## 3. Use lazy loading.

As grandes aplicações contêm muitas rotas. É uma boa prática utilizar o carregamento preguiçoso para carregar o módulo para uma rota que é realmente necessária, não para todas elas. É apenas uma linha no código chamado loadChildren:

```typescript
...
 {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then(
        (m) => m.HomeModule
      ),
 }
...
```

## 4. Use o trackBy juntamente com \*ngFor.

Usando apenas o *ngFor sem função trackBy numa aplicação angular removerá todos os elementos DOM e depois recriará novamente os elementos DOM na árvore DOM. Assim, mesmo quando os mesmos dados estiverem a ser utilizados, irá abrandar o desempenho da aplicação quando houver muitos dados. É por isso que é bom usar trackBy juntamente com *ngFor.

`component.ts`

```typescript
...
trackByItemCode(index: number, item: Item): string {
  return item.code;
}
...
```

`component.html`

```html
...
<div *ngFor="let item of items; trackBy:trackByItemCode">{{ item }}</div>
...
```

## 5. Acabe com o tipo `any`.

Evitar o uso do tipo "any" pode potencialmente reduzir o número de erros por desatenção no seu código. Além disso, a não utilização do tipo any na nossa aplicação tornará a refatoração mais fácil. Além do mais, se for para usar any, é melhor migrar para o JavaScript.

## 6. Previna memory leaks.

Quando navegamos de um componente para o outro componente, o primeiro componente é destruído e o outro componente inicializa-se. O primeiro componente foi subscrito ao Observável e agora o componente é destruído. Isto pode causar fugas de memória (Memory Leaks).

> Pode ver um exemplo real no arquivo `components/navbar/navbar.component.ts` desse projeto.

```typescript
...
this.subscription = this.service.get().subscribe();

ngOnDestroy() {
  this.subscription.unsubscribe();
}
...
```

## 7. Declare tipos de dados seguros.

Depois de uma analize minuciosa dos valores possíveis de um tipo. Em vez de declarar uma variável de um determinado tipo, podemos declará-la como uma lista de valores possíveis ou um tipo diferente, por exemplo.

```typescript
...
type Status = 'active' | 'inactive';

let status: Status = 'active';
...
```

## 8. Seguir as melhores práticas de código Angular.

- Certifique-se de que o código não excede o limite de 400 linhas por arquivo.
- Certifique-se de que o código não excede 75 linhas para cada função.
- Se as variáveis não sofrerem alteração ao decorrer do código, use `const`.

### Funções

- Nomes de funções para ouvintes de eventos, usar o prefixo `handle`. Exemplo: `handleDeleteTask()`
- Nomes de funções para funções de callback, usar o prefixo `on`. Exemplo: `onTaskDeleted()`
- Nomes de funções para funções de validação, usar o prefixo `validate`. Exemplo: `validateTask()`
- Descritivas, porém não muito extensas.
- Utilizar camelCase

### Variáveis

- Todas as variáveis devem ser escritas em inglês.
- Descritivas, porém não muito extensas.
- Tipar sempre que possível.
- Utilizar camelCase.

### Interfaces

- Precede o `I` antes da nomenclatura que segue o padrão PascalCase.
- Utilizar pasta de models para o armazenamento das mesmas.

### HTML

- Os campos de formulário com mais de uma tag `<input>` devem conter uma tag `<form>` como pai e nele conter um evento `(ngSubmit)` e um `type='submit'` no botão ao invés de um `(keyup.enter)`.
- Usar form-control ao invés de ngModel.
- Todas as tags `<input>` que possuirem um respectivo `<label>`, utilizar um `id` no input que tenha o mesmo valor que o `for` do label.

## 9. Crie componentes reutilizáveis.

Construir componentes reutilizáveis é uma regra de ouro que não pode ser omitida quando se discutem as melhores práticas do Angular. Se existe uma parte da interface de sua aplicação Angular que sabe que usará em vários locais, construa um componente para ela e use o componente. Te dará uma UI mais consistente. Além de avisar retraba-lho causado pelo "Ctrl + C" "Ctrl + V". Crie e os armazene na pasta `components/shared` do seu projeto.

## 10. Use o Angular Material.

O Angular Material é um conjunto de componentes de interface de usuário (UI) que implementa os princípios do Material Design. Possui ótimos padrões de responsividade e acessibilidade. Além disso, é um conjunto de componentes que é atualizado constantemente. É uma boa prática usar o Angular Material para criar componentes reutilizáveis.

## 11. Formulários reativos.

Uma grande vantagem que vejo dos formulários reativos é a possibilidade de manipularmos, através de uma API mais definida, o comportamento do formulário, seus campos e tudo mais.

Então **NÃO USE NGMODEL**.

Você pode ver mais sobre e seus usos nesses artigos: [Guia passo a passo para a criação de formulários reativos no Angular](https://medium.com/@gawadnikita/step-by-step-guide-to-creating-reactive-forms-in-angular-ea5031ba3b3b), [Introdução a formulários reativos no Angular](https://medium.com/@agoiabeladeyemi/gentle-introduction-to-reactive-forms-in-angular-c3cb01b90037) e [Angular FormArray: Guia completo](https://blog.angular-university.io/angular-form-array/).

```typescript
constructor(private fb : FormBuilder ){}

this.form = this.fb.group({
  name: ['', Validators.required],
  email: ['', [Validators.required, Validators.email]],
  password: ['', [Validators.required, Validators.minLength(6)]],
});
```

```html
<form [formGroup]="form">
  <input type="text" formControlName="name" />
  <input type="email" formControlName="email" />
  <input type="password" formControlName="password" />
</form>
```

Para validar os campos para uma futura submissão, basta verificar se o formulário é válido.

```typescript
if (!this.form.valid) return;

// Código para envio aqui.
```
