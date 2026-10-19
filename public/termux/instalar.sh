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

echo "==> Instalando o .NET 10 do Termux e o termux-api..."
pkg install -y dotnet-host dotnet-runtime-10.0 termux-api

echo "==> Baixando o programa..."
# O "?v=" muda a cada versão: sem ele, o cache do site (Cloudflare) pode entregar o pacote antigo.
sha256="92a2e80008719ae089c57a1d176e5f2fab419c11f89e617757d82105e0b52e38"
pacote="${TMPDIR:-$PREFIX/tmp}/informacoes-rede-termux.tar.gz"
curl -fL --progress-bar "$url/informacoes-rede-termux.tar.gz?v=${sha256%"${sha256#????????}"}" -o "$pacote"
if ! echo "$sha256  $pacote" | sha256sum -c - >/dev/null 2>&1; then
    rm -f "$pacote"
    echo "O pacote baixado não confere (SHA-256). Espere alguns minutos e rode o instalador de novo." >&2
    exit 1
fi

# Os dados (nomes, histórico) ficam em ~/Ferramentas; esta pasta só tem o programa e pode ser trocada.
rm -rf "$pasta"
mkdir -p "$pasta"
tar -xzf "$pacote" -C "$pasta"
rm -f "$pacote"
chmod +x "$pasta/informacoes-rede.sh"

# Atalho "rede" para abrir de qualquer lugar.
if ! grep -q "alias rede=" "$HOME/.bashrc" 2>/dev/null; then
    echo "alias rede='$pasta/informacoes-rede.sh'" >> "$HOME/.bashrc"
fi

echo
echo "Pronto! Para abrir:  $pasta/informacoes-rede.sh"
echo "Ou feche e abra o Termux e digite:  rede"
