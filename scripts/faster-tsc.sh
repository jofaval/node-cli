base_dir="./logs/typescript" # use "." if you want them at the root
current_as_str=$(date '+%Y-%m-%d_%H-%M-%S')
tsc --strict -p . > $base_dir/tsc-strict-check_$current_as_str.log