const { task, src, dest, series } = require("gulp");
const jasmine = require("gulp-jasmine");
const shell = require("gulp-shell");
const path = require("path");
const clean = require("gulp-clean");

task("clear-test", () => {
  return src("spec/tmp/page.pdf", { read: false, allowEmpty: true }).pipe(
    clean()
  );
});

task(
  "test",
  series("clear-test", () => {
    return src("spec/*-test.js").pipe(
      jasmine({ verbose: true, config: { random: false } })
    );
  })
);

task(
  "java-compile",
  shell.task([
    'javac -classpath .:"' +
      path.join(__dirname, "src-library/*") +
      '" ' +
      path.join(__dirname, "src/main/java/br/com/appmania/*.java")
  ])
);

task("java-copy", () => {
  return src("src/main/java/**/*.class").pipe(
    dest("out/production/node-pdfbox")
  );
});

task("java-clean", () => {
  return src("src/main/java/**/*.class").pipe(clean());
});

task("compile", series("java-compile", "java-copy", "java-clean"));

task("default", series("compile", "test"));
