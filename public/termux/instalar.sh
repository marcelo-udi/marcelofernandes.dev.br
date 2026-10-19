#!/data/data/com.termux/files/usr/bin/sh
# Instala o Informações da rede no Termux:
#   curl -fsSL https://marcelofernandes.dev.br/termux/instalar.sh | sh
set -e

url="https://marcelofernandes.dev.br/termux"
pasta="$HOME/informacoes-rede"

if [ "$(uname -m)" != "aarch64" ]; then
    echo "Este programa é para Android 64 bits (aarch64); este aparelho é $(uname -m)." >&2
    exit 1
fi

echo "==> Instalando dependências (openssl, termux-api)..."
pkg install -y openssl termux-api

echo "==> Baixando o programa com o .NET embutido (~25 MB)..."
pacote="${TMPDIR:-$PREFIX/tmp}/informacoes-rede-termux.tar.gz"
curl -fL --progress-bar "$url/informacoes-rede-termux.tar.gz" -o "$pacote"

# Os dados (nomes, histórico) ficam em ~/Ferramentas; esta pasta só tem o programa e pode ser trocada.
rm -rf "$pasta"
mkdir -p "$pasta"
tar -xzf "$pacote" -C "$pasta"
rm -f "$pacote"
chmod +x "$pasta/InformacoesRede" "$pasta/informacoes-rede.sh"

# Atalho "rede" para abrir de qualquer lugar.
if ! grep -q "alias rede=" "$HOME/.bashrc" 2>/dev/null; then
    echo "alias rede='$pasta/informacoes-rede.sh'" >> "$HOME/.bashrc"
fi

echo
echo "Pronto! Para abrir:  $pasta/informacoes-rede.sh"
echo "Ou feche e abra o Termux e digite:  rede"
