// Tipos de commits mas utilizados
// build: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
// ci: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
// docs: Documentation only changes
// feat: A new feature
// fix: A bug fix
// perf: A code change that improves performance
// refactor: A code change that neither fixes a bug nor adds a feature
// style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
// test: Adding missing tests or correcting existing tests

/**
 * Estructura de commit
 * <type>(<scope>): <subject> - el scope es opcional
 * <BLANK LINE>
 * <body> - opcional
 * <BLANK LINE>
 * <footer> - opcional
 */

/**
 * Ejemplos
 * feat: se adiciona nueva seccion en el modulo 'xxxxxx'
 * fix: se cambia la version de la libreria 'xxxxx'
 * docs(router): se agrega documentacion al router
 *
 * Commit con cuerpo ⬇️
 * perf: se aumenta velocidad al iniciar el servidor
 *
 * Se mejora la etc....
 *
 * Revisado por: Z
 */

module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
      'subject-min-length': [2, 'always', 10],
      'subject-max-length': [2, 'always', 200]
    }
};