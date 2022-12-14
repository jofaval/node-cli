import { spawnCmd } from "../core/system.core.mjs";

spawnCmd("echo", ["This is such a great comic character!"], {
  onStdout: (data) => console.log(data.toString()),
});
