export const formatRut = (rut) => {
    const newRut = rut.replace(/\./g, '').replace(/-/g, '').trim().toLowerCase();
    const lastDigit = newRut.substr(-1, 1);
    const rutDigit = newRut.substr(0, newRut.length - 1)
    let format = '';
    for (let i = rutDigit.length; i > 0; i--) {
        const e = rutDigit.charAt(i - 1);
        format = e.concat(format);
        if (i % 3 === 0) {
            format = '.'.concat(format);
        }
    }
    return format.concat('-').concat(lastDigit);
};


export const Fn = {
    // Valida el rut con su cadena completa "XXXXXXXX-X"
    validaRut: function (rutCompleto) {
        if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto))
            return false;
        var tmp = rutCompleto.split('-');
        var digv = tmp[1];
        var rut = tmp[0];
        if (digv == 'K') digv = 'k';
        return (Fn.dv(rut) == digv);
    },
    dv: function (T) {
        var M = 0, S = 1;
        for (; T; T = Math.floor(T / 10))
            S = (S + T % 10 * (9 - M++ % 6)) % 11;
        return S ? S - 1 : 'k';
    }
}

