import { cmd } from "../core/system.core.mjs";

cmd("echo test > ./examples/file-write/ez-output.txt");
cmd("echo appended >> ./examples/file-write/ez-output.txt");
