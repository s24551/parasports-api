# Instrukcja (zeby sie nie zgubic)
Wymagania REST 

src/routes/*.ts - routing dla zasobów
src/controllers/*.ts - implementacja metod HTTP, kody HTTP i nagłówki
src/app.ts - konfiguracja CORS
src/models/*.ts - modele danych

Wymagania GraphQL

src/graphql/schema/types/*.ts - definicje typów GraphQL
src/graphql/scalars/dateScalar.ts - własny scalar
src/graphql/schema/queries/index.ts - implementacja resolverów z filtrowaniem, sortowaniem i paginacją
src/graphql/schema/mutations/index.ts - implementacja mutacji
src/app.ts - konfiguracja serwera GraphQL

Wymagania Dokumentacja 

src/config/swagger.ts i src/config/swagger-schemas.ts - specyfikacja OpenAPI
docs/parasports-docs/* - dokumentacja w Docusaurus
OpenAPI UI dostępne pod /api-docs
GraphQL Playground dostępne pod /graphql

Wymagania TypeScript - otypowanie

src/models/*.ts - interfejsy modeli danych
src/graphql/schema/types/*.ts - typy GraphQL
src/controllers/*.ts - typowanie w kontrolerach
