import { Workbook } from "react-excel-workbook";

export const formatRut2 = (rut) => {
    // XX.XXX.XXX-X
    const newRut = rut.replace(/\./g, '').replace(/\-/g, '').trim().toLowerCase();
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
}

export const Fn = {
    // Valida el rut con su cadena completa "XXXXXXXX-X"
    validaRut: function (rutCompleto) {
        if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto))
            return false;
        var tmp = rutCompleto.split('-');
        var digv = tmp[1];
        var rut = tmp[0];
        if (digv === 'K') digv = 'k';
        return (Fn.dv(rut).toString() === digv);
    },
    dv: function (T) {
        var M = 0, S = 1;
        for (; T; T = Math.floor(T / 10))
            S = (S + T % 10 * (9 - M++ % 6)) % 11;
        return S ? S - 1 : 'k';
    }
}

export const formatRut = (rut) => {
    let div1, div2, div3, div4;

    if (rut.length === 9) {
        div1 = rut.slice(0, 2);
        div2 = rut.slice(2, 5);
        div3 = rut.slice(5, 8);
        div4 = rut.slice(8, 9);
        rut = (div1 + "." + div2 + "." + div3 + "-" + div4);

    }
    if (rut.length === 8) {
        div1 = rut.slice(0, 1);
        div2 = rut.slice(1, 4);
        div3 = rut.slice(4, 7);
        div4 = rut.slice(7, 8);

        rut = (div1 + "." + div2 + "." + div3 + "-" + div4);
    }
    return rut;
}

export const descargarExcel = (data, nombres) => {
    console.log(nombres, 'SE EJECUTa')
    return (
        <Workbook filename={`${nombres}.xlsx`} element={<button button className="btn btn-lg btn-success" > Descargar</button >}>
            <Workbook.Sheet data={data} name="Sheet A">
                <Workbook.Column label="Desde" value="createdAt" />
                <Workbook.Column label="Hasta" value="updatedAt" />
                <Workbook.Column label="Total" value="total" />
            </Workbook.Sheet>
        </Workbook >
    )
}