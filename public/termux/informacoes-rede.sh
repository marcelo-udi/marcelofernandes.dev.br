#!/data/data/com.termux/files/usr/bin/sh
# Abre o Informações da rede no Termux. O .NET procura a OpenSSL (para HTTPS) pelo LD_LIBRARY_PATH,
# e o Termux guarda a dele em $PREFIX/lib, fora das pastas que o Android olha.
pasta=$(dirname "$(readlink -f "$0")")
export LD_LIBRARY_PATH="$PREFIX/lib${LD_LIBRARY_PATH:+:$LD_LIBRARY_PATH}"
exec "$pasta/InformacoesRede" "$@"
