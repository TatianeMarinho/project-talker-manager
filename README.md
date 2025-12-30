🗣️ Talker Manager

Uma API de gerenciamento de palestrantes construída com Node.js e o framework Express. A aplicação permite realizar operações completas de CRUD (Create, Read, Update e Delete) em um arquivo JSON, além de implementar rotas de login com geração de tokens para autenticação.

🚀 Funcionalidades

CRUD de Palestrantes: Listar, buscar, cadastrar, editar e excluir palestrantes.

Filtros de Busca: Pesquisa por nome, taxa de satisfação e data de palestra através de query strings.

Autenticação: Rota de login que gera um token aleatório de 16 caracteres.

Validações de Segurança: Middlewares personalizados para validar tokens de autenticação e campos obrigatórios (nome, idade, data, etc.).

Persistência em Arquivo: Manipulação do sistema de arquivos (fs) para leitura e escrita de dados.

🧰 Tecnologias utilizadas

Node.js: Ambiente de execução.

Express: Framework para gerenciamento de rotas e middlewares.

FS (File System): Módulo nativo para persistência de dados em arquivos JSON.

Crypto: Módulo nativo para geração de tokens.
