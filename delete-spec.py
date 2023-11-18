import os

# Exclude tests files (.spec.ts) from the project ignoring /node_modules/ dir
for root, dirs, files in os.walk("."):
    for file in files:
        if file.endswith(".spec.ts") and not root.startswith("./node_modules"):
            os.remove(os.path.join(root, file))
            print("Removed file: " + os.path.join(root, file))
