const path = require("path");
const fs = require("fs");
const compile = require("../../test/utils/compile");

const dir = path.join(__dirname, "..", "..", "contracts");

export function compileBase(override = false) {
  const _path = path.join(__dirname, "./standard.json");
  if (!override && fs.existsSync(_path)) return require(_path);
  const code = compile(dir, "Tiramisu.sol");
  fs.writeFileSync(_path, JSON.stringify(code, null, 2));
  return code;
}

export function compileBaseMock(override = false) {
  const _path = path.join(__dirname, "./standard-mock.json");
  if (!override && fs.existsSync(_path)) return require(_path);
  const code = compile(
    path.join(dir, "mocks"),
    ["MockTiramisu", "MockToken"],
    dir
  );
  fs.writeFileSync(_path, JSON.stringify(code, null, 2));
  return code;
}
