function _0x3337(_0x543ae3, _0x235975) {
    _0x543ae3 = _0x543ae3 - 0x1e7;
    const _0x567524 = _0x5675();
    let _0x33377f = _0x567524[_0x543ae3];
    if (_0x3337['unVOML'] === undefined) {
        var _0x2ab206 = function (_0xda817d) {
            const _0x48d2f0 = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';
            let _0x4724a0 = '', _0x553a83 = '';
            for (let _0x32f46a = 0x0, _0x208309, _0x428ee8, _0x2efaf0 = 0x0; _0x428ee8 = _0xda817d['charAt'](_0x2efaf0++); ~_0x428ee8 && (_0x208309 = _0x32f46a % 0x4 ? _0x208309 * 0x40 + _0x428ee8 : _0x428ee8, _0x32f46a++ % 0x4) ? _0x4724a0 += String['fromCharCode'](0xff & _0x208309 >> (-0x2 * _0x32f46a & 0x6)) : 0x0) {
                _0x428ee8 = _0x48d2f0['indexOf'](_0x428ee8);
            }
            for (let _0x6919fb = 0x0, _0x77d259 = _0x4724a0['length']; _0x6919fb < _0x77d259; _0x6919fb++) {
                _0x553a83 += '%' + ('00' + _0x4724a0['charCodeAt'](_0x6919fb)['toString'](0x10))['slice'](-0x2);
            }
            return decodeURIComponent(_0x553a83);
        };
        const _0x1cb951 = function (_0x17749a, _0x59a658) {
            let _0x38fcde = [], _0x22f36c = 0x0, _0xa4bc66, _0x2633d0 = '';
            _0x17749a = _0x2ab206(_0x17749a);
            let _0x30b9ab;
            for (_0x30b9ab = 0x0; _0x30b9ab < 0x100; _0x30b9ab++) {
                _0x38fcde[_0x30b9ab] = _0x30b9ab;
            }
            for (_0x30b9ab = 0x0; _0x30b9ab < 0x100; _0x30b9ab++) {
                _0x22f36c = (_0x22f36c + _0x38fcde[_0x30b9ab] + _0x59a658['charCodeAt'](_0x30b9ab % _0x59a658['length'])) % 0x100, _0xa4bc66 = _0x38fcde[_0x30b9ab], _0x38fcde[_0x30b9ab] = _0x38fcde[_0x22f36c], _0x38fcde[_0x22f36c] = _0xa4bc66;
            }
            _0x30b9ab = 0x0, _0x22f36c = 0x0;
            for (let _0x41e225 = 0x0; _0x41e225 < _0x17749a['length']; _0x41e225++) {
                _0x30b9ab = (_0x30b9ab + 0x1) % 0x100, _0x22f36c = (_0x22f36c + _0x38fcde[_0x30b9ab]) % 0x100, _0xa4bc66 = _0x38fcde[_0x30b9ab], _0x38fcde[_0x30b9ab] = _0x38fcde[_0x22f36c], _0x38fcde[_0x22f36c] = _0xa4bc66, _0x2633d0 += String['fromCharCode'](_0x17749a['charCodeAt'](_0x41e225) ^ _0x38fcde[(_0x38fcde[_0x30b9ab] + _0x38fcde[_0x22f36c]) % 0x100]);
            }
            return _0x2633d0;
        };
        _0x3337['QDZwUA'] = _0x1cb951, _0x3337['DTfCRt'] = {}, _0x3337['unVOML'] = !![];
    }
    const _0x5689b2 = _0x567524[0x0], _0x40496d = _0x543ae3 + _0x5689b2, _0x59e776 = _0x3337['DTfCRt'][_0x40496d];
    return !_0x59e776 ? (_0x3337['AzineW'] === undefined && (_0x3337['AzineW'] = !![]), _0x33377f = _0x3337['QDZwUA'](_0x33377f, _0x235975), _0x3337['DTfCRt'][_0x40496d] = _0x33377f) : _0x33377f = _0x59e776, _0x33377f;
}
(function (_0x454961, _0x43d222) {
    const _0x14c860 = _0x3337, _0x74c9a = _0x454961();
    while (!![]) {
        try {
            const _0x4b9c63 = -parseInt(_0x14c860(0x810, 'pk&V')) / 0x1 + -parseInt(_0x14c860(0x41d, 'Dzp9')) / 0x2 * (parseInt(_0x14c860(0x76a, 'sOIM')) / 0x3) + parseInt(_0x14c860(0x9dd, 'B9Tk')) / 0x4 * (-parseInt(_0x14c860(0x647, '6#U$')) / 0x5) + parseInt(_0x14c860(0x64d, 'IXWX')) / 0x6 + parseInt(_0x14c860(0x2fc, '))Nx')) / 0x7 + parseInt(_0x14c860(0x9d6, 'v!iA')) / 0x8 + -parseInt(_0x14c860(0x9c5, 'IXWX')) / 0x9 * (-parseInt(_0x14c860(0x815, 'cl&d')) / 0xa);
            if (_0x4b9c63 === _0x43d222)
                break;
            else
                _0x74c9a['push'](_0x74c9a['shift']());
        } catch (_0x4f2db8) {
            _0x74c9a['push'](_0x74c9a['shift']());
        }
    }
}(_0x5675, 0x3a682));
import _0x2523a0 from './config.js';
import * as _0x5ac19b from './database.js';
import { loadCommands } from './utils/commandLoader.js';
import { addMessage } from './utils/groupstats.js';
import {
    isGroupLocked,
    groupLockStatus
} from './commands/mute.js';
import _0x5d4b2d from 'fs';
import _0x1bb592 from 'path';
import { fileURLToPath } from 'url';
function _0x5675() {
    const _0x19e5e9 = [
        'jaRcUCoehq',
        'CrtdVW5YqtldUmkvW7y',
        'aZ1HWQhcHhHRdCkZ',
        'WRBcKh7dVCoK',
        'hCoCm8oHbCoJqq',
        '4PA8nUkwV8olWORdMbBcNvBdMG',
        '8jITH3Pe77+z776Y772m77Yh7727776e776a',
        'W47dTwpcMI8',
        'WODgdSo6tMVcMc8ctG',
        'hCkQWORdHmohoaxcVmkVwa',
        'W6qIW4He',
        'pmo7nL3dQehcT8kYWPi6',
        '4PAP4PAJ4PsA4PEF4PsJ4PE84PwY4PAL4Pst4PEs',
        'umk1WOHfaSorW6qMoNO',
        '4PEtoUkuQaezWQBdMYJcGuu',
        'W7HBW5ZcSGNcVwW',
        'WQvgW609WRi',
        'AJ8EW6/cGCobuSoiWQ8',
        '4PwQ4PwU4PEx4PEd4Pwu4Pwa4PAK4Psd4PAz4PEb',
        'WRClpCkOuetdVbdcOuG',
        'vCoiW7GfoW',
        'gSkHW4Lbwq',
        'WOTknuud',
        'u8kJcsRcMa',
        'WPm3W7dcOSkVW7tcSSkIW7TZ',
        'kJ5UvmojW49MWOLVbG',
        'D8khmu7cKCo5tu0VW4m',
        'WRjWEfTs',
        'DfzlW6tcHW',
        'WQ7cJ3dcLKq',
        'WR17W5KcWRnab2a1WOq',
        'aYfIWQJdQW',
        'sxL4CSoR',
        'aaRcRW',
        '4PAtz+kwRXddVCkGW5ZdTSkhWOa',
        'uSkuW5NdHmopob/dSSoXwa',
        'WR1ZtaeAW7pdPJxcKaG',
        'lSozAfFcQmo1ixCgW4m',
        'udxcImoDWOJdRmkIW6G',
        'jUg1Vog2LK3INA7ILk3ILzBILQBILPtcMG',
        'W6NcIXWewW',
        'WRpcIhJcHua1WRC',
        'daRcOG',
        '4PsDW4NWQBkIW57cVtfnkSomW40',
        'yWr9zCkjE8oNmWL7',
        'aCkWW59H',
        'A8kth1T4',
        'WQ/cSxxdT8o7fuVdOZ3cJq',
        'WR1Ox0DW',
        'tg5KWQpcIhKKspcXGR8t',
        'dog2REg2J0/INilIL43ILzZILPVILkBcJW',
        'mJy2zCkHq8oX',
        '4PEhWO3IL5LUdComsbO9aW',
        'l2SBWQmAW5FcTmk3W5xdIa',
        'tSofWQOlfmkGomoUlCoH',
        '8jcaRmoZWQ8',
        'WQTLW5G8WQ4',
        'vWZdVCoaWQy',
        'W41ZW47cHmoqW4KZWOfa',
        'WOfAeCo6',
        'WRZcULpcVLG',
        'ASkFhfTHauy4dsW',
        'cmo8jSoScq',
        'xmkGktBcQW',
        'Cmkmlr0',
        'W6LgW4RcPq',
        'E8kDp0hcLCo+auLd',
        'WOVdTeJcVvO',
        '4PwaW7tILzJdGhRcHmoZpmkjWR0',
        'E8kPa1q',
        'B1CCmSkarmkT',
        'W68qW6ddQSo1WRLt',
        'WOVcOe7cRCoAW6JcLCkau8os',
        'l0X1WOKe',
        'WOj7W48oWQ4',
        'rt7cTSoaWPq',
        'C8koW7LQFW',
        'yr8YCSkeB8oNeqjT',
        'EWqMW4FcHG',
        'WOTPW6RdIa',
        'Dg1kwCoe',
        'W7bRW7qFWOvIBa',
        'sCk3W4DYuW',
        'yruP',
        'W6RcH8kOW4eBWRxcUdjnlG',
        '4PsDW4NILyzoW5ddOXzwACou',
        'vGOSw8kRWQlcGLNcMW',
        'iCo/e13dTLFcPmk0WPS',
        'tq0YwG',
        'W4RdJx/cUZ4',
        'c2OXWOmU',
        '4PEPW67ILkBdPmktW7NcJ8krr8ot',
        'srOLwSk3WQlcJehcSWW',
        'WR7dG03cK0u',
        'WRZdMN7cVvFcIry',
        'a+g1G+g0I8oS4P6s4Psw4Pse4PwP4PExvW',
        'v8oUBCkxCa',
        'ngmxWQSlW7/cM8kTW4i',
        'W6/dJIldIbDMWR0lWQiTW6yJW6W',
        'zHpcQmoXWQ8',
        '4PszwokbQSohivX5dmoFWR0',
        'W6pdH0JcMb4',
        '4Ps5hdVdQmkeW6nCW6qWya',
        '77+c77YHWQBVVR4E7760772b772q776y77+F',
        'W7aJW77dTSo6',
        'xYNcVCkXeHtdLG',
        'CcenEmku',
        'BrK+Fq',
        'xbaVtCkTWRxcHG',
        'AXuUzCkhCCoNlW',
        'q8ktW4z3tv/cR0dcTG',
        'W5NcVc0IjmkYyq',
        'fmoCoa',
        'FXJcRSoDWO7dQSkIWQ8HW4C',
        'W5JcNmk5WRr3WQZcTCostwK',
        'WOasnSkVsL3cUq',
        'W7tcJ8kLW4OCWRldVxaVpq',
        'uJOwW7jazgFcJmoN',
        'WRZdMCkik1ddI10jEa',
        'WQXQW4OaWQrxva',
        'W6TmW4JcVH4',
        'estcOmo7kmkxW4n9W4m',
        'k2nAW7GrW7VcVmkHWPJcIq',
        'zH0oW5bf',
        'wxfcW5dcSa',
        'dmkZkmkdja',
        'WOqnC8kJuqBcSXdcTqC',
        'W6PWW7pcNaq',
        'tdmTWQXI',
        'bmkCWR5olW',
        'W41bW4/cGbS',
        'rW80W41X',
        'cqlcPCkfhW',
        'WQxcUNRdICod',
        'n8kJi8oamCkDW7mXWPlcOq',
        'WOasmmkLs0ZcUa',
        'FWKJqSk9WQxdG1NcKuK',
        'W64qW6tdTSoK',
        'sCkwW5X8CeqNw8kZWRS',
        'zxfjFCocW5uVWPnjcG',
        'YytjSZhHT5pHTl3HTzNHTOjB4BE+4Bwn',
        'WPbPW7i',
        'rZivW5DS',
        'E1majCkgrSkM',
        'W7JcHSkPW40w',
        'FCkzcvjd',
        'BHK5C8ksD8oL',
        'FmkClHRcKCo5exaSW5y',
        '77Yp776p776N772c772q77+I7725WRRVVAdVVQa',
        'n34JW7lcUCoow8obW7/cMq',
        'Ex4bW7JcRmoAuSkU',
        's8kpWR/dO8oG',
        'W6TTW6/dVZCiqmobWOhcMG',
        'WQFdGSkRoeBdIK8pAqS',
        '4PskW5BILBaAirragri7',
        'k8kXl8klDmkCW7m4WPddSG',
        'WR7dKmoWWPrZWR3dSSooka',
        '77YQ77+c772f77Yv77YHxXxWPiQC77MhCCol',
        'fuH4W4lcNCoYumoIk2q',
        'xSopW78FuCkIpmo3lCkp',
        'WOJcJKldPmo7',
        'ssNcQ8oCWQK',
        'W7GBW6tdR8o7WRrPW6XQW6e',
        'WRbOFYGZWQjeW4VdJr8',
        'lmkWjSkIbq',
        'wxTyW63cNG',
        'qWOpW41D',
        'DmkRhvddPeRcOSk2W54t',
        's++9Mo+/S++/Oo+9PU+9Qo++KE+8P8kYW6a',
        'stekWR95',
        'f8kJWP8',
        'mGtcOCk7bq',
        'W71WW7xdVHqjvSowWRtcMa',
        'W77cH8kW',
        '4PEAWOlIGlNdVMpcMr7dJxZcOa',
        'WQXMmM8VWQH8W4ZdKa',
        '4Pwu4PEG4PAO4Psd4Ps84Psr4PEa4PsT4PEo4Psa',
        'W5DSW7hdMdG',
        'Dh9Awq',
        'eM1iWQqcnr3cLCoseKisnq',
        'pSkFWR0',
        'y8kYpSkpoCoq',
        'WO7cQ1BcOCojW78',
        'tLrsW4dcMCoNwSo5kKW',
        'WO/cTK7cOCotW77cN8krD8oA',
        'W7L/W4/cJG',
        '4PswW73IGBW1DsWXgmkJsW',
        'fSkgg8kkoq',
        'WPZcR07cOCkDWRFdMSkMvmow',
        'WQpdImkbk0/dNuGljW',
        'hNngWPSD',
        'WQxdJSkXj0ZdLG',
        'Dqq8ySktzCkSpHvX',
        'yCodW6SPpG',
        'WR7cVxNdV8otl0/dTt4',
        'pmoVo1W',
        'u0SwjCkD',
        'tde8W7NcRW',
        'l8k2a8kUja',
        'zSkyq1vPeXvaxqK',
        'xCkVAmkEBLTBWPhcJg4',
        'vCooW6S1ba',
        'oSkmgSkTaa',
        'u8oAWPVdISoFDrVdUCoXcW',
        'WRCpiSk5wLRcQaxdUs0',
        '4PEhWO3IL5LUdCoFwrPTeG',
        'W6xdKg7cOqC',
        '4PwQW7xILQ8Xm1u8uCkJW7K',
        'W7xcGmk0W4KF',
        'rmkogrJcJa',
        'yqpdTGH5vq',
        'jGxcVmovpG',
        'p0HXWO0DgCoE',
        'WPrTW4VdGKC',
        'WPn2W57dRLu',
        'DYpdPt1N',
        'jmk9o8kWaG',
        'DIBdPCo1WQX0W6n1W7a5',
        'm8kxW5fwsa',
        'WQ13W5ymWQjxhq',
        'WRVcL3NcJSoY',
        'WQX8W44aWRLCEgi2WPy',
        'st/cQmoAWPVdOSkP',
        'W7PNW6/dSa',
        'YBRkG8kM4BAA4BsI4BAp4Bw8x+g2OEg3VW',
        'ymkflLv7nfeafcy',
        'hqBcSSkNoGZdGhhdQ8kH',
        'W6yUW55hWPZcQmokW73dQSoi',
        'dH3cPmkTjW',
        'xg1GW47cRW',
        'Bamvv8kp',
        'iCkoWOqXWP4NWQ18kW',
        'WRm3W7dcOSkV',
        '8jMYLvFdNSkXW4rAW4xcSCkkjq',
        'W4PHW6xcMCog',
        'Ab/dTG5Px3FdHSkpW6q',
        'W6DheSk/xYtdM2eLqG',
        'WR1MW442WRDrrgGGWOq',
        'Ab8XCmkN',
        'WONcHKZdUCoB',
        'WQzDcCo2wc7dMwO0ra',
        'W7TOW7xcQmk/',
        'WQfbeSoYCs4',
        'yXmyWObj',
        'v8oABmkAsq',
        'vCkGW4T7DW',
        'YRNlKfVHTR/HTkJHTiRHTkldHEg2JUg1SG',
        'WRJcHgxcLe82W6GFWQCT',
        'yMznvCouW501',
        'sCkeW4D3yMlcPedcPMy',
        'Cc7dS8oKWQPAW692W6i2',
        'W4xcR0/cSmosW6JcN8kuqmol',
        'W7GnW6tdO8o6WR5tW6LDW7a',
        'WQNdGSkHkW',
        'm8o3zSkVrW',
        '4PwFcEkaO8ozoXJdNmkUtcq',
        'gbVcV8kHpItdL0/dVCkZ',
        'yaiYE8kRCW',
        'W7jTW5hdGIS',
        'emk6W4zJpxiHxSk0W6i',
        'xvLLW6BcM8o8rSoMf2q',
        'zuHAzmok',
        'WQH+W5ygWQfbb3q/WOu',
        'W4RcRfxcSmkDW7FcN8kgumoE',
        'WRvzdLaQ',
        'A0yrjCkCcCoLW5ZcHca',
        'yMzyx8otW4WJ',
        'W4OIW7ZdO8oK',
        '4PEhWO3IL5LUdCoruH1PaW',
        'CH/dKSohWOq',
        'WQjadSo+wY4',
        'WRujv8k/Fa',
        'rJldPmoKWRC3WQCLW4iY',
        'lwmd',
        'tZpcUmocW5RdO8kJW71cW4O',
        'W5SuW7NdQSoXWR4wW7LMWRu',
        'W7aTW4NdPmoe',
        'fCk0W4TEcCosW6vF',
        'CrioFmkx',
        'vdattmki',
        'm8krWQbCkq',
        'x0CLmmkB',
        'WO5PW5xdJeZdRr0y',
        'qJPR',
        'nmoUluVdPepcOmkG',
        'yJD9WQdcRa',
        'wCojW5alnq',
        'WOb1W7CAWQ4',
        'WRnhfmoXwZG',
        'yhTj',
        'EXWLWO5HD3imW4m',
        'Cc04qCkB',
        'FGqywCk+',
        'ihr9',
        'nSoElwNdTG',
        't09YW4dcNCo2e8oCfYe',
        'WPHCeW',
        'a8k2WODEeW',
        'qZ4lW6LDBKm',
        'WPZcUN7dPmofhf3dPcJcJW',
        'W7GnW7xdPCoHWQ5t',
        'imkvnmk4fq',
        'pSoUkG',
        'W41ZW5pcH8ofW48C',
        'WOjqEfvY',
        '4Ps+W5RXGyobWOT/jCo5W6WCW44',
        'W57cItKIbq',
        'qJpcQCoe',
        'WPPtx295',
        'kmofh8oYmG',
        'jH3dVaX5stpcNCoA',
        'W554W5FcGSoiW4uxWOm',
        'iCo4mhRdOG',
        '4PszwokvLmohivn1a8orW6K',
        'd2v7WO0N',
        'pSkknqpcK8o2dey6WOu',
        'ESktaL5QbW',
        'zmk7WQVdRSoP',
        'pCoUmL3dSue',
        'ub4VdSkyWRtcKeJcJeK',
        'nmkuWQnrdG',
        'q8keW50',
        'tbSVxmo4W6ZdG27cLGG',
        'oSokheNdPW',
        '4PwOt8o8WPaWmmoqA8oQWQu',
        'W5jZW5dcMmofW4SC',
        'EZzaWOFcMa',
        'yCk0nwfzka',
        'W73cJSoA',
        'W4LzW4RcRmoG',
        'WRGGW7xcVSkcWRhcTCk4WR5G',
        'W4L/W4FcJSolW6eCWPTxW5C',
        'u8oQCa',
        'WO3cNK/cUX4eWRZdUXe',
        'DqldSGP4',
        'cuj4WPWM',
        'EaX7WRJcLxHRsmoRoa',
        'gKHOWPureSkqWQmdya',
        'FWO6WOH9',
        'W6PgW5VcOHxcVwXGfa',
        'WRjhW6ZdUv0',
        'WP8tb8k8uq',
        'nCoKoq',
        '4PEPW64m77Ul4OgEWRRcUmkAv8kFCCoc',
        'W753mcaYWQbxW4ldKtu',
        'hSowmCoQe8o/',
        'W5OIW4XkWQO',
        'hXRcPCoIEghdTw3dQ8k0',
        'WRSQW6BcQa',
        'EwzYW4xcMa',
        'W5NdNxJcTG8cW7lcVLq',
        'mmkXiSkegCkvW68OWPRcTq',
        'iMmxWQSlW78',
        '4PEEW5ZILi3dKq85W6qyWPHO',
        'iCkHomkuo8kEW68jWP7cOq',
        '8jsrGSkQrE+9M++/O++9To++TgJVVQRVVOO',
        '4PszFUkvQ8k9W7ddILVdHCkVW44',
        'WRXSk0e/WQbFW4VdULO',
        'yWmUD8kbCW',
        'sCotWQOahCkOomoOAmoX',
        '4PsDW4NILyzoW5ddTHjjACki',
        'cGhcOSkRmstdIwFdRmkL',
        'uZOvW7L5zf7cLSoIea',
        '4PIEnUg2U+g3Pog2HEg2Q8U54BEV4BsHWPy',
        'WR9Lj1ec',
        '4PsJF+kvR8k9gNfeWOVdPfC',
        'W65cW57cTa/dQxW0ESoG',
        'W7vTW7ldQbSkvG',
        'WQn/wKv6WRBdMc/cIu8',
        'WOnlBhvK',
        'vJBdNH11',
        'AI8qBCk2',
        'WQJcONZcPSoZ',
        'W78sW77dR8od',
        '4PskW5BILBaAirDCdXeT',
        'WRlcLLZdTCoa',
        'WPWhcCkNuq',
        'ASkmoqBcKmo4dK0UW5W',
        'v8kthCoWe8o1cvmUFG',
        'W7O/W4JdKmoa',
        'WRfAgmoOCYxdLMOnra',
        'W7vNW4TrWRRcTmoaW7BdGmkn',
        'WRNcMx3cLfu3W6WxWP8x',
        'WPvOrK5fW7pdGJldIeK',
        '4PMXoUg0Rog0RUg0LUg3LmIR4BwB4BETca',
        'WRGRW6FcRSkPWQFdU8kTWQ5M',
        'W6ZcJ8kfW6Gk',
        'a++9RE+8PU+/RE+/J++8UE+8Oo+9HmktFq',
        'W7NcKSk/WRXWWRhdSmo5ts8',
        'WOTkpmkIeeBcUHddSWO',
        'DqxdUG52ssu',
        'jSo0yCoaaCkEW7a0WPJcUq',
        '4PsfuokvItBdIgldTIHhFa',
        'suHWW5xcNmoGe8k7zei',
        'nCoIkf3dTKFcQSkHWPSO',
        'a2rAWRxcKxi/qSkz',
        '4PEPW67WKBciWP3cSmk3WPbhW5zZ',
        '4PADW53IG7ldUedcP8o2W40cgq',
        'FN1ZACoO',
        'cHVcPCkJjthcI2hdT8kT',
        'W6fpW4tdRrW',
        'CH7dGbLVrtNdGa',
        'AGSJW7RcPW',
        'z8kpahn1',
        'W7iIW4HrWQq',
        'W75HW63dVJqmxSox',
        'bcRcGCkPmG',
        'dtxcGCo7l8kb',
        'BCktaf97ea',
        'vZVcVmom',
        'W4ZdMN/cRqm',
        'WRRcMwu',
        'nmoFmLddLG',
        'A8oBhfTMbXGDdYC',
        '4PA8nUkwV8olWORdMbBcM1ddLW',
        'WRe1W5pcVmkR',
        'yrtdPYPVqYldL8kPW7u',
        'j0Psu8okW4TSW7C',
        'bH/cV8kYjW',
        'BJOmWR1czf/cLSoMFq',
        'rCkoWRtdGmoyjHFdU8oN',
        'hCk7W7Psza',
        'hCk9W7bWBveGumkUW5W',
        'o0WHW5runCoFWRKAjq',
        'imkCW7rhuq',
        'nSkVWPKBWRu',
        'w3PtW67cKa',
        'W7PHW6pdTX8',
        'cWxcQCoroq',
        'AcVdUcfo',
        'ouvKWO0rvSoFWRLdlW',
        'fCoDn2ddIW',
        'W5HrW4VcVG7dQwa0pSoK',
        'AdSaWOPv',
        'bIFcG8o7kCkRW4X2W58',
        '8j6TOCkZr++8RE+8JE+9VU++LE+/K+++VU+/Sq',
        '4Ps5hclVUQ7IGiRcS3ddUI1IvSkC',
        'WRraEMvE',
        '4PwO4Pwr4PES4PAF4PwA4PEL4PAJ4PsB4PAN4PA4',
        'W57cJJhdIa',
        'WQLwcSoSyZJdHwaYvq',
        'W5XxW5dcLtC',
        'WOdcLeNcPX0rW6NcV0lcRa',
        'xCoGumkasa',
        'W7uPW59dWOtcR8oDW7a',
        'umo7FCkcCueAW5hcLsS',
        'hCkoWPddImooxW',
        '4PwaW7tILzddGhRcKSo1l8kEW7i',
        'WObTW7BdJfFdQX0',
        'yaePWQ9F',
        'W65kW4pcTa',
        '4PwOt/gkSi51A8oNA8o6WQZdOG',
        'lmkJiSkfjSk+W6K2WPNcTW',
        'zSkPn3zDjJy',
        'WOldO27cUKVcKI4',
        'ASkxhe5MgLS',
        '4PQOW5BHTBtHTlxHTk7HTBlkTEg1QUg1UgG',
        'gCkyWRS7WOWWWQ96pCk0',
        'W5T5W4dcNSojW4KxWPXPW5m',
        'WRJcSxFdTSocfq',
        '4PA94PEf4Pwj4Pwa4Pwq4PEh4Psf4PEk4PsS4PEA',
        'qCofW7KCemkRomoP',
        'xb3dM8ogWRm',
        'tSo6W7ioaW',
        '4Psu4PEC4PwF4Psu4Ps34Pwc4Pwf4Pw34PEw4Ps4',
        'WQ3dG8k2oKldN04pCa',
        'gthcHmoS',
        'FLTCA8oq',
        'W5W0W7ZdLmoN',
        '4PQ/W4NHTylHTAhHT5/HTPdlOUg0PEg1Jmkf',
        'DqlcSWb4qIpdJSkvW74',
        'kgOvWQuBWPa',
        'W68dW7tcSblcQg4/C8oG',
        'FSogsmktsq',
        'WO/cVuNcPCoAW78',
        'A3j4W4ZcKW',
        'WP7dV8koawe',
        'W6mIW5vuWP7cO8oAW6VdHSok',
        'W4hdMdVdR04ZW6pcVf7cVW',
        'WRDsd8oRvsJdNh8HtW',
        'aIdcN8kjga',
        'iSkWiCkjoSkdWPy',
        'WQzDhSo6ugVcMc8dqa',
        'WQrZqKqnW7NcOq',
        'W4/cP8kdW6Om',
        'amkhWODbhW',
        'zX3dHSoBWP0',
        'uZylWOPJ',
        'WPi2W7dcJSoqWOWDWO1iW5m',
        'WOfwhmoRstNdKhXQkW',
        's8o+qCkLAG',
        'ASkanqdcOCoZb04SW5e',
        '8lIFMCkWWQZVVQBVV7/VVjFVVQ7VVl3VVRZVVPK',
        'k8kFWQGWWQS9WQb+hCk5',
        'CmkLo3zdnYe',
        '4PwAWQSTw8oKsSkRWRRcKba',
        'W5u1W4LFWQhdPSoaW7BcH8oa',
        'W4XLWOpcMmolW4eCWODkW5m',
        'YP/lVSkZ4Bwp4Bsb4BsN4BwyWOFHT7FHTPu',
        'YP7kKr3HTj7HTRRHTRpHTyNdNEg0IUg1QG',
        'W4JcN8ktWO5L',
        'wmkiWOVdISoz',
        'ESkDhLvd',
        'WQbrD3LC',
        'fCk+WO5ueSoaW68',
        'i0GuWOuV',
        'Axfk',
        'xr8MWRbi',
        'WQxcQ1/cGCoq',
        'hFgbRzFcR8kH',
        'AsOfW7tcSmoo',
        'W7rmW5FcOG',
        'p1iOWOux',
        'mNvW',
        'W5RcPmk3W487',
        '4PEg4PsY4PssWPu2',
        'W75LmhiSWQXeW4hcLeS',
        'FZ8d',
        'qZ/cRW',
        'WOtcGgldICoG',
        'WRJHTixHTOtcU+kCIEkvRokuSUkwS+kwJSo3',
        'u8kvWO4',
        'CqyfrCkf',
        'W4ZdKh8',
        'z8k4va',
        '4PszFUkvQ8k9W7ddJ1BdH8k6WOW',
        'WQNcQeBcUuS',
        'WOfSowy',
        'B8kea1Dcea',
        'W7roW5JcTHNcHgWPBCoK',
        'WQj/wu5dWRBdOtxcJa',
        'W7SaW4P8WRS',
        '4PEhWO3XJOk/a8ksFWz8dmog',
        '4PswW73IGBW1CIXKomkyBq',
        'lq7cV8kUmcxcHxBdT8oG',
        'oLvOWQvJv38lWPRcNG',
        'W7ePW49zWRFcO8ofW73dK8oi',
        '4Ps54PAo4PwMW7Gi',
        'WPNcQ1tcOmoWW7/cICkgqSoy',
        'CH8oySkuF8oSoW',
        'WR4KW7BcVSkCWQtcQ8oSWRD7',
        'W4JdHMNcRrW',
        'WQ7cIxpcGLuGW6qvWPq',
        'a8kZySkvjW',
        'Cx5AWRdcV8oCu8onWRddJG',
        'WPmXW6dcLmkO',
        'W5OqW6HeWPq',
        'F21tFSob',
        'WQ/dQ2VcSfC',
        '4PEFW7rZW6FdGGblWQPZW4u',
        'W5/cJJhdOI4',
        'WQ9cpuWb',
        'rJz0WPZcGG',
        '4PA/W6qyidJcTg3cPuRdUW',
        'WQD0kfe8',
        'W5O2W49rWOm',
        'WQ5GW5uCWQzHu2WKWOu',
        't8oHW7i3ma',
        'o1TUWOWeoCoEWRSv',
        '4PQM77M/FtZVV4VVVlpVVRhVVA/VVyBVVlNVVP0',
        '4PEU4PE84PEr4PEz4Pst4PEj4PAu4PAN4PsJ4Pwi',
        'W5nXW7BcNaS',
        'W77cJCkRW4aAWRJcUa',
        'W7jVW7pcUmon',
        'W7nTW7G',
        'zITAWPukW6JcSmkQWOBdNW',
        'z8kuW41MuxxdOv/cOgW',
        'W5HZW5C',
        '4PAAW4ldRSoMhCkVWRGWzI8',
        'WRzRW47dU1S',
        '4PEvzCkZ77Uc4Oc+W7tcNCkLWRv2c8kX',
        'WQXQmwC',
        'WRL+W4xdShy',
        'jIldTHLPrtNdGmkjWRO',
        'fmoqoCoPr8o9ruWKaa',
        'vZ/cTConWRFdOmk/W7WdW4W',
        'xSkBWPFdHSoooq',
        'uqastmk6',
        'W4NcTY0Z',
        'sq95WQlcOa',
        'uZawW7G',
        'rSkuW512uN7cSN7cQNi',
        'WODYlLuQ',
        '4PwZW6BXHB6fr8kEW548muhcSW',
        'WR0sW6ldQCoHWQO8',
        'WQX+W5KgWRTxlq',
        '4Ps5hokuJCkbW4FdSKBdOITZ',
        'W7zQW5VdKGK',
        '4PABkokwNCk7va9AW5dcJmky',
        'qSouW6mBemkRzW',
        'W53dLwNcTGCcW6/cOvdcPW',
        'WQ3dL2G',
        'WRL3vuzsWP7dJI/cM0K',
        'jfm+WOSD',
        'W7xcPCkJW4OT',
        'yCk/bxvc',
        'WRvwpxej',
        'WPNcUHRdQCkDW4ZcK8kqvmkF',
        'W69gW4NcVr3cQMW',
        'W7HBW43cTblcRwW+sSoG',
        'WRPMW5SDWQnbcw8IWP8',
        'sXKjqmkO',
        'FvWuiSk4qmk8WPq',
        'WQdcG2dcGCo0',
        'vCoSzCkdwG',
        'cxRcMCofWPxdPSkNWQ8pW4O',
        'W43cSCkQWQXb',
        'WQK6WRJcR05CaCoyWOBcVmo3WQPC',
        '4PsJF+kvP8k9gNjiWPhdSWC',
        'qtT6WRJcJNL2oSoClG',
        'sau3W6rM',
        'rsDIWQNdGwDSc8onka',
        'WPNcU0RcOCopW7VcNSkysSor',
        'rt4yW6KuBKpdISoSeq',
        'W7XKW6xcOCoS',
        'WRtdN8kQi0ZdJfK',
        'iMHoWQZdQSkCr8ofWRNcN3tdLG',
        'cCohkmoDlW',
        'WR7cVCkLWQT3WRRcNW',
        'wmojW6CkEW',
        'tfv1W4tcHSoEvSoLn2a',
        'u8koWPddGSozoGpdRmoVhq',
        'WPbJW5pcJ8ofW5GCW4zoW4u',
        'E8ktavv7eh8egq',
        'vHW8WOhcPmo2xCoIlw4',
        'W63cJSkXWR93',
        'WRmKW7BcUmkVWRhcQmog',
        'WO90W4ddJfm',
        'W7RcMmk8WR1MWQ3dISoorYu',
        'Cc7dTmoKW48',
        'W4pdS0pcPJ8',
        'mCkGBmktimkzW78WWP7cOa',
        'WO4pkG',
        'tcPKWO7cSa',
        'WRmRW6xcQmox',
        'gmoCkmoea8o3tu8pBW',
        'BhTe',
        'WRL3vuzs',
        'kSo/p0ZdSfFdJW',
        '4PEf4PAS4PAQrcK',
        'WQRcVx/dTSozpv3dOY/cIW',
        'W6XeW6ZdRJa',
        'uSkoWR3dTSoi',
        'eCkHW750BLyOwmkL',
        'wcCbW5xcRW',
        'CmkUva',
        'hCkJWPHebSotW68',
        'W61kW7/cOJC',
        'ySk4p2fEjJyPWRTy',
        'WPfBwhne',
        'W6ddM1xcQhhcRtG',
        'WRldH2i',
        '4Ps84PE74PE44PAK4PAQ4Pwu4Pw34PAD4PAd4Pw5',
        'zX/dPWr5stVdGSkoW7u',
        'DxTnumohW5SJ',
        'YkxjI2JHTApHTy3HT43HTiVdQ+g0Oog3NG',
        'tmoUFCkhCxe',
        'C8kgW4nuCG',
        'WRFdImkRkM7dNu8DFau',
        'W75pW5ZcSa4',
        'WO7cHNtcOve',
        'W7yOW4LhWRlcTmonW73dG8oJ',
        'WOZcOLxcQ8op',
        'WOfzW4ldT1W',
        'bGFcVmoSnG',
        'yYpcT8oJWRWTWQaLW5e',
        '4PwQW7xcMvbXusXnWQ7dSa',
        'W64aW7ldTCoGWQHFW6nU',
        'W4hdNw3cPX0cW6NcO1q',
        'WR3HTBJHTPxcPUkFP+kxM+kuT+kwJokvP8kF',
        'WO3cQ04',
        'wCoqW64obCkPaSo5kCoR',
        'hCk8WPJdHSoFjLRcVmoOfW',
        'WQiXW6VcO8k6WQC',
        'dt/cJSoRnSkbW4XUW6VdNa',
        'cSkZWObysSozW654jxa',
        '4PEEW5W7WRnepmoOhCkApa',
        'CmkaWPFdSSoK',
        'W6K5W73dS8oE',
        'jLG5C8kaD8o3mbm3',
        'WRT3W5CgWQjxBwq0',
        'o0X1',
        'WR0sW7hdQ8oXW5a',
        'WPNdGgNcSupcMrddHwhcPW',
        'W57dH3RcPqS',
        'WPaYimkIBq',
        'W6ugW6ddH8on',
        'cSoslSoXdSo5tveGza',
        'gZxcGmoXl8kbW6HZW4i',
        'wCouW6vca8kPpmo5pmk/',
        'x0r0W4lcNmoNvG',
        'fSoMW4yxjSobW746F2C',
        'dK/dU8oIfY7dKsldRCkW',
        'W73cKxtcGLiZW6OEW5m7',
        'WQzwofm9',
        '4PwQCpgeGyn7W47dR3/dLCokAG',
        'rCkfW4H2xbO',
        'WRNcUeVcNmom',
        'wSovlSoQcSk6',
        '4PAtz+kwPXddVCkIW4ZdTCoiW5K',
        'WRddKw8',
        'cxRcL8oiWO7dOmk/W7TcW4u',
        '4PEtoVcsLlyxW7NdVG7cPbldRW',
        'WRTvu0vw',
        'brNcUSoXdq',
        'WRJcKdhcU2GwWRDrW7K',
        'vJ/cQ8ofWPVdPSkP',
        '4PEkmUkwPKNdUfnolx3dKa',
        'WPq8W5xcRmkO',
        'b2bSWPGte8oT',
        'gCo+lv3dTWtdQmoZWRuE',
        'WP3dHftcTw8',
        '4PwOt+kxISoIEYddI3BdSCkS',
        'lCkFWReG',
        'pSkcW590Bq',
        'svL/W4xcPmo2qmoLjwy',
        'trK6WPvH',
        'W7tdLLRcIIW',
        '77Y+772TxCk98yIXJd3cRG',
        'Cr07W4SVvxKnW5/cUG',
        'WQRdGtVdOLBcMaVdKcZdSW',
        'WRS1W6VcVCkV',
        'q8osW6yluCkjm8o9jmoS',
        'wCorW7SUfq',
        '4Ps5hokuJCkbW4FdSKBdOITJ',
        'qCkygxjK',
        'W7JcNmkZWR1IWQNdUCol',
        'AwPuumopW5yTW4C',
        '4Psg4PsF4PwsnSkS',
        'bmkkWOzclq',
        '4PwfjUkvRSoKuCoRWQtcTSohW4C',
        'DaeEEmkw',
        '4PEEW5W7WR1ip8oKd8kaCG',
        '4PEPW67ILkBdPmktW7VcJ8kbtmoD',
        'WPT4W4VdNu3dTXiyW4K',
        'amkEW7HvDG',
        'WODLW6NcMfRdQWqrW4dcLq',
        'jSkMp8oQ',
        'kXRcPCkNj2hcIcldISkL',
        'WQRdMCkSkvhdL0KECaC',
        'WQZcLLZcSCoR',
        'cbBcR8oriG',
        'WOpcO1VcO8oyW5FcN8kgumoE',
        'rWu5F8kjnSoTmGTN',
        'Fd1RWRJcLx5Rd8ok',
        'rCkfW4rRuW',
        'W7VcJ8kIWRDG',
        'yZddPmoTWQbJW75GW6mA',
        'lSkPWOmzWPu',
        'tdanW7G',
        'wCk4bxf7',
        'WR7cKCk/WQ53W6JcUmkgCsW',
        'AfygjCkH',
        'CbJdTWHYytldLmkjW7e',
        'DCkZcZ7cJW',
        'WOrQl8oQtq',
        'aW7cPq',
        'ESkgafn7',
        'hE+/ME+/LU++Io++HU+9To+9Mo++Uo++Svi',
        'WO3dHhpcNfO',
        '4PsfuEkwJ00ZrZ7dI8kwWRa',
        'W6HtW6RcTaJcVwa0ECo2',
        'quzBsCoW',
        'WR9Tk2K3WQryW44',
        '4PsepVcqG7dcHSksfmkyAWzP',
        'ECkBnrVcJSoAb1yOW4e',
        'yMWDeCkgW68JWPXZbW',
        'WOVcOe7cRCojW7VcNCkQqSoC',
        'AcZdPmkl',
        'WRddMCkXeuddMvinEa4',
        'WQxdG8kXj0tdILmBBq8',
        'xSkIk252',
        'cCk2WPb4W406WQnVBSkr',
        'WPnOW7ddJha',
        'sCkeW5PXxhFcPa',
        'WPfkFSoSBuZcTHpcSfm',
        'DSk8lMfFlcO',
        'bgaOWO81',
        'W5lcT2jl',
        'sSoQkmo4',
        'rcT6',
        'WOVcOe7cRCojW7VcNCk0qmol',
        'W5xcISkEW7yO',
        'mCksjmkqhG',
        'xCo3BmkrDW9q',
        'F3rsE8oF',
        'W5ToW7ldSdK',
        'DtRdSaTZ',
        'ESkzdL5p',
        'jSo1W75vfW',
        '77Y7W5BVVzVVVjlVVk7VVyhVViBVVyZVVy3VVBG',
        'W79TW7xdNaGcrSocWRpcMa',
        'q8keW5Oi',
        '4PsepUkuOrZcImoli8kjyb8',
        'W5hcIWeSbq',
        'vHXQw8kOWRxcIKdcM2m',
        'WQJdGCoLpuZdLvKbCWC',
        'hCowzG',
        'W6JcMmoWWRL+WQtcNW',
        'qSoiW7O2ca',
        'emoic1ldIG',
        'uY98WRJcIhrSgmoymW',
        'sSoIASkbra',
        '4PEvzFc/T5RdVCo+WPJcPmk6Feu',
        'WRpcK33cL2a',
        'htxcLCoQ',
        '4PABkokwNCk7vb1sW4BdGmk9',
        'WR3HTk7HTRZdSEkCJ+kxIokuIokvM+kvSmkp',
        'WR7cNx/dKuu3W6eEWOCT',
        'fmoCkW',
        'WPddHmkUgKZdKXWkCHu',
        'WO/dL0NcKhS',
        'WRm2W7hcRmk6WRe',
        'WQH8W44aWQjtqfiXWPm',
        'amkdb8klgG',
        'DZVcLmo6WP0',
        'WQNcKupcIuy',
        'ovfKWPObaSov',
        'tYfP',
        'W7FcRt0Mkq',
        'W6LgW4hcPq',
        'WQpdImkX',
        'cdFdJCo/omkqW4T1W4JcMq',
        'WR05W7NdQmo/W7PxWQ1nW7a',
        'WRhcSwJdOmoxf10',
        'W7JcJSkOWOqxWQ/dSJLPpq',
        'o0X1WOKekCoxWQudnq',
        'cSkBWOyhWOO',
        'leHS',
        'ESkddLbQfKe',
        'WONcR0RcSmouW7xcLa',
        'mSkFWRa',
        'W4LBW4lcUCok',
        'AXuUzCkhCCoNcb5U',
        'hCkRWOZdJmorxW',
        'nKjKqmkevCoxeWeT',
        'kCkiWQyGWOi3WQn3a8kL',
        'WP5KCxuO',
        '4PU9cEg0MEg3TUg1LEg1SCIW4BEq4BwPya',
        'dH3dTSoVDqldL2FdUCk0',
        'qJ4UWR/cJNPGb8oxoa',
        'hW7cSCkJos0',
        'W5baW5JcLZm',
        'W7ZcMSkHW4CnWRxcUa',
        'W6NcG8kTW5yNWRBcUdr8mG',
        'oaZcUCkWma',
        'WOqEmG',
        'cmkgW4NdMCkzkuFdOmkXba',
        '4PwAWQVILyOyWQTDWQdcTSkkvW',
        'l8kScSkuoq',
        'rZOp',
        'jH8QEmkdzmkI',
        'WRddM8kXo2W',
        'WRFcUhtcN3m',
        'cmkYWQzsfmohW6SYnW',
        'dCkWW590Aua',
        'WOVcQLFcRCotW5xcLmkzwG',
        '4PAS4PA14PsA4PEd4PwV4PwG4PAh4PEq4PsW4PEi',
        'W4H0W7dcGCov',
        'CruXDCkjE8oNeqjT',
        'aSkWW4O',
        'gCkNW5X3DeKSB8kPW7i',
        '4PAT4PE94Psq4PEW4PsG4Pwt4PAm4Pw64PEY4Pwj',
        'WP5ToNCOWQftW5hdGfO',
        'WRrdeSoTsdG',
        'omoWpxXeicGt',
        'WQJdGCkFavO',
        'k8oBfConbG',
        '4PszwpcTKkOVeLapW5NcQmk5',
        '4PA8nSolWP/dKmoCcSosc8kz',
        'W61cW4VcPrxcQMaQF8oR',
        'WR9qk8oUvq',
        'WOmfiCk7xLVcUb/cVua',
        'wSojW68yhSkIpSo/',
        'kSo7mLhdSq',
        'W4NcG8kTW5zyWOlcSJjQEq',
        '4PEAWOlWMAcsaSoxiSorymkYW5G',
        'gNz+W4NcH8kZamkSDtC',
        'BCkipqS',
        '8lIdTCkzW7VVVy7VV6ZVVkxVVBpVVlNVVQZVVRO',
        'rcT6WRZcKq',
        'jrVcJ8o2lW',
        'WPNcQ07cTmon',
        'utCCW4xcSG',
        'stVcTConW5S',
        'cmk7W4D4CuWNvmkFW6i',
        'sXGqzSkc',
        'uY8xW7ra',
        'mMPqWQ8n',
        'W63cUmkrW50W',
        'WOtcOhhdQCo3',
        'EEg3T+g3JhtINP7ILzxIL43ILjRILkddIG',
        'WQ/cPhFdUSoc',
        'W6DZcmoSwtNcLsjGCq',
        'eCkQWOC',
        'WO/cOMRdI8oh',
        'W7vzkCohxYtdRa',
        'DaXOWOPGxhLQ',
        'W4BcJqCxnq',
        'sCktWPBdIW',
        'rs0jW7jg',
        'BcTRWONcJa',
        '4PsVWOdILPzpx8kUnmo4jmoG',
        'ALaQmSk5',
        '8kg0J++5KW',
        'WPVcNMBcUgm',
        'W4reW4JcHaK',
        '4Ps7WQ8477U94OoHw3RcJSkhls0X',
        'gWpcUmkmiG',
        'j2GoWQ0BW7/cVCkHW5ldJa',
        'Amkygfn8avWofI0',
        'bdxcG8oRbmkjW4nZW4G',
        'W556W4/cMmkU',
        'Ati5W694',
        'mgO5WPqy',
        'W7nVW4BcV8oq',
        '4PEEW5ZWM4c9axJdIapcGZRdIq',
        'W74ZW5jeWRlcOCkt',
        'W5TZW4/cJSoqW4K',
        'n8owl8o2bSo9qq',
        'i34FWQCkW67cTa',
        'WRrwcCo4tdS',
        'pvXLWPaBo8ovWQqFiq',
        'CGxdPZi',
        'wSkFWO0',
        'nSkKWObNda',
        'W5jZW4FcGSofW6eCWPTxW5C',
        'oJJcGSoPE8kgW4T1WOBdJq',
        'tSkjWPJdGSooa0q',
        '4Ps04PAk4PwF4Ps54P+3bog3P+g3J+g3TEg1Ua',
        'kmkXnq',
        'WRpcLXS',
        'W6mkW55EWQFcR8ogW7BdQSoi',
        'CCkciv98bLqkga',
        'Cc7dSSo2WOP5W6LGW5WY',
        'WQ/cVeJcQ8opWRRcK8kBa8oE',
        'W5H9W7ldVGHnhSksWQVcLa',
        'W7CIW48',
        'w2FdHCoKWQr0W75GW7v3',
        '8kwcSSoNWPq',
        'w1jLW4JcJSoHxmoJngW',
        '4PQzWQ/HTjhHT73HTkpHTBZkTEg3UEg3P2m',
        'sXeEWP96',
        'WQn/gCogFq',
        'W5LyW4RcUXWex8oxWPpdTW',
        'hWBcVCk2oIRdUMpdRCkK',
        'WRBcO2ldT8os',
        'W67cI8kQW48',
        'h8oloCoMeSoUqq',
        '4PwaW7tILzddGhRcGmoWoSkcW7i',
        'iwmo',
        'WRBdImk1iKldM1K',
        'hZNcICo7nmkPW4DPW5xdMa',
        '8jswSSkQiH7cQdJdQcNdSCoq',
        'vYiCWR1j',
        'cGhcOSkRosJdI2NdMCkJ',
        'WRaQW7dcUSk8WQBcV8oSWQ99',
        'ESk+icNcVq',
        'vJ/cQSoCWP/dTSk4',
        '4PsfuokvGtBdIgxdRJ0xpG',
        'WRT9W48zW7zhv2KXWOq',
        'WRZcJghcG04KW6G',
        'cCkyWR8fWOO',
        'WRDSkNm',
        'W6elW61CWQu',
        'oUg1K+g1SSk94P6T4PAO4Ps24PAL4PAXW6q',
        'qJPBW6TDzuJcISkJeW',
        'itJcM8oXeG',
        'sYVcUCk1oY3dIMpdVmoG',
        'vSktpCoRa8k6ru8Vzq',
        'uYDGWQS',
        'WQvUW7hdSxW',
        'WQTAdSoRbMS',
        'WRTLW6dcOSkYWR/dKq',
        '4Ps+W5RIL63cHCkfibJdSCo3da',
        '4PAF4PE84PEr4PEz4Pst4PEj4PAu4PAN4PsJ4Pwi',
        'l8ktWQ0XWOizWQLOpCkH',
        'CGJcUwC',
        'WRFcJvhdLmoW',
        'WRrweCo5CstdKwO',
        'WQnbcmoXvW',
        'W75mW5FcTWNcUMW+',
        'W6RcLCkdWRjW',
        'WOqej8kLs0JcUYNcVee',
        '4Ps7WQ/ILjxdKIWzxmkCWO4M',
        'WOZdPSkbaxK',
        'amk6W51oDKWQva',
        '4Psh4PwX4PwC4Psx4PEN4Psx4PAd4PwD4PwM4PsF',
        'AtSzW7NcK8omrmoxWR7cIq',
        'mMK2WQSCW7VcVCkHW7xdNq',
        'ASkbp07dHSk6bKSUW4W',
        'D0rRsmov',
        'WQ7cMx/cLwW3W74iWPiV',
        'WOjxgmoMFW',
        'cmkmWQrKkq',
        'kJJcJmoQE8ktW4TUW47cMq',
        'p2nAWQSrWRxcVSkIW4dcIq',
        'WOVcVLe',
        'WPDJW7pdILi',
        'W75cW4NcPrxcPMC',
        'WOtcUetcMhe',
        '4PA/W6tILzrHF8kXBCkLrSo7',
        'ELCdmmky',
        'WR3cR0JcTSot',
        'cNfTWRCt',
        'W5P4W5FcGSolW4iMWPTbW4i',
        'tr3dLXL1',
        'Emo8j8kfAHPbWO3cGZm',
        'uJ/dU8keW5RdHmk8W78qW4q',
        '4PEPW67ILkBdPmktW7JcK8kxt8oA',
        '4PwQ4PwU4PA5W4HF',
        '4PwfjINcSb7dO8oXWRhdLSon',
        'WRxcHvFdPmoo',
        'tSkjWPJdGSoo',
        'vCk/cd/cSG',
        'WQ5DhSoZss/dKhW',
        'umkZcu9a',
        'dCkNh8k6ja',
        'WRGGW7xcVG',
        'AGOTWOfMqa',
        'EwG1i8kN',
        'W7WvW6nbWOC',
        'gmkZWOW',
        'WOfPW4hdR1O',
        'feGEr8kZWPxcJeBdNGG',
        'lYpcVmkPhG',
        'x0rLW4tcH8o3vSoYegq',
        'WR9Tk2K/WQHAW4ddGfO',
        'nSoToa',
        'dmk5W5zLEauLxSkZW6u',
        'WQ1WpMC+',
        'CSk4zd88',
        '4PA+4Psx4PEmW6hcRG',
        'xq0Ms8kSWQq',
        'W54ZW6pdRCox',
        'WQ1CW40FWP4',
        'bbJcUmkNjW7dI27dOq',
        'amk2ymkCCaLaWOZcHNu',
        'W5NcKcuVna',
        'W5D3W43dI8kwWPHzWOblW4m',
        'W7GnW6RdLSo3',
        'W6T7W6ddVb8',
        'Y4djTCoP4Bw24BEX4BwF4BEdo+g1G+g3Hq',
        'ESkmua',
        '4PAAW4lIL5JcHfBcSSkUiwO5',
        '4P+MlmofW5DtW6KseCoiWOK',
        'tSofWQbL',
        'leHOWOTurmkdW6nuCq',
        'Dmk2W5bHvW',
        '4Ps7WQ8777U94OoHw2hcH8ksjJDL',
        'WRdcI0xcM1y',
        'aSopmvVdSeNcOmk9WOOQ',
        'qCkwW5Oi',
        '4PEMsIFcOX9qWRmdWQeh',
        'c8k+pSofme4fWQZcIsLIbSkG',
        'W73cMmk8',
        '4PEee+kvOCk/eIFdMNKLaq',
        'tbadWQLh',
        'qcfGWRRcHgv2cConna',
        'WOipjW',
        'WOFcQ1tcSCoIW7xcJCkBrSon',
        'xSkSWPG',
        'u8kGWPldQCo4',
        '4PAUWPtILiFdOKavW6/cUKxcPG',
        'qeaPg8kG',
        'WRJcK3/cLcS',
        'WQ52W6JdR3e',
        'WRRcJNdcNaf9WQ1vWPOV',
        'vda3W7jxyehcGmohfG',
        '4PAUWPr9WQCpfCoZWQnuWRO',
        'WRFdLNlcRvBcLbddJ3FcOq',
        '4PEhWO3IL5fUdCozuHP0aq',
        'CaWCW792',
        'W45nW6VcQX8',
        'WQxdI8k9h3O',
        'BamUqmkH',
        'qCkvW51Ru3FcSG',
        'CfmeiSkUwCk4W5ZIHzrV',
        'WQr3W5qCWOLaqMWZWOq',
        'smofW6ykbCkP',
        'qtddIZv1',
        'WODYvvveWPldMYZdIey',
        'rM5oWRNcKNj3smkuFq',
        '4PEAWOlILi/dVGZcMb7dI3JcUG',
        'WOj9tgTs',
        'jmkea8kWeq',
        'zYNdO8oOWQL+W6rUW444',
        'W7SKW6hdQCos',
        'W6GJW5NdJCoe',
        't090W5pdICk+e8ogjxu',
        'mKz2',
        'DGpdVbLYtZJdI8k3W7u',
        'WOfeW70DWPu',
        'ESktaL5ceeyEhc8',
        'nMCwWO4R',
        'WPi2W7FcHmodW4SvWO0eW5e',
        'WQT9W44',
        'xG0+',
        'W6LLW53cSde',
        'wdWTW6XD',
        'WOXKj0O+',
        'lmkYkG',
        'WOVcOe7cRCorW7pcLmkE',
        '77+477+X77YPWRpVVPxVVz/VVjxVVR3VVB3VV4q',
        'nwmuWQaYW7/cOSk3W4FdJG',
        'xSoUASkxybrAWPu',
        '776R77+oW7dVV7VVVl3VV6xVVRJVVOFVViZVVA0',
        'FSk4jW',
        '4PwOt/gkRBb1A8oMBCo1WQNdQq',
        'omkEWQO1WP4G',
        'eCkIWOzEcq',
        'BsldRG',
        '77YkEU+/Uo++HU+/L+++Qo+/RE++OE+9HU++Ma',
        'E8krpW3cI8oJbW',
        'WP/cVv/cTG',
        'hCkWW4TL',
        'CmkZkJvuoMqSWOjY',
        'x8ouW7Ggh8kR',
        'W47dM2NcP05mWQBcL17cPG',
        'WRBdHNhcNhm',
        'gSkHW5jJAvyEvSk0W7K',
        'WObkFSoSBehcSWhdS0u',
        'WR3cShBdUSoyp1BdVcu',
        'tSkoWOVdJmofmG',
        'k8klWOO6WP0',
        'WQ5XfmojAG',
        'cuC1WOiq',
        'jSk6omkspCkvW68',
        'vbCLxmkd',
        'g8k6W4zHpva5w8kHW6u',
        'WRJcU3JdPSoBfvBdPbhcJW',
        'pSkFWRPE',
        'W7uPW48',
        'W7xcLmkZWRmO',
        'WPJcSxFdTSocfrJdVd3cMq',
        'ECocC8kctq',
        'W7FcJSkrWRX/WQhdUW',
        'W5L/W4/cN8obW54',
        'DYHMWO7cMq',
        'f8k0WOrcf8o5W68Hm3e',
        'W5dcTtG1nG',
        'W7tcH8k3W5CzWQBcUa',
        'wM5TWQpcHxiLaCoxpG',
        'WRSGW7hcVSk8WRpcVSk/W5e',
        'W4tcPeK',
        'pmkjWRO1WOOXW4y',
        'vcTIWQ/cJNPGjCoClG',
        'sXVcUCoImJpdINFdQmkZ',
        'zsBdO8oKW6u6WQPkW7mX',
        'FZ0oCmkn',
        'k8kRmvBdQv3dPCkWWPeA',
        'WOz0W6pdM0VdSby',
        'W7eqW77dOCoGWRi',
        'svLLW4xcJmoGua',
        'Cvv6W7NcHq',
        '4PsDW4NIGBHoW5ddSWDolmor',
        'qJT6WQpcG35Qn8owmW',
        'W67cOsuUj8kJjmkQsCk2',
        'xKvdW6tcVa',
        'W6RcQCkhWPb4',
        'lH3cPmkTj2hdJgZcUmkH',
        'WQHhxCoYwtJdHM4Nra',
        'aCkoWR11nG',
        'W63dGwJcPXXbWQVdSwJcRa',
        'pVgfHB1KW7q',
        'D2Ttx8oo',
        'W65cW57cTa',
        'l0PqWPaA',
        '4Psg4PwU4PEx4PEd4PYNyEg2H+g0NUg2K+g3JW',
        'W4qWW7xdS8oB',
        '8lcxO2HR772277+077YR77++77YDW7VVVjC',
        'ce9PWRSm',
        'W4RcS8kCW7aR',
        '4PsfuEkwJ00ZxsldLCkBW74',
        'mSo4gmokpq',
        'W4tdV1dcHGu',
        'W5zgW47cVWW',
        'W6PRW63dVG',
        'WQjlcCo6uI/dKgSura',
        'W5/cQcKX',
        'WO4dmmkNh0/cSWtdS0y',
        'WPVdG0pcJwm',
        'WQuGW6ZcQCk4WQy',
        'yZxdPCoUWRC',
        'BtGuwSkF',
        'CH7dNWjQssxdPmkBW6m',
        'amkPWOveaSo5W68Mixq',
        '4PED4PA14PsA4PEd4PwV4PwG4PAh4PEq4PsW4PEi',
        'WR7cK3/cH0qGW74AWOCH',
        'nCoIkf0',
        'W4JdJh7cOrSvW6m',
        '4PwAW5RIG6T0WQa1WRq7FmoW',
        'WPRcLwxcUvqWWOC',
        'yeiuaSka',
        'W6qkW6XMWRe',
        'WQeNW5hcP8kS',
        'zYVdVSoQWQS',
        'W5pcKGOKka',
        'a34FWQCkW67cUmkQW4hcKW',
        'w8oSBmkcDLSyW57cOYa',
        'WOXAW4tdNuC',
        'xaKMqSo4W7ddKW3dK0K',
        'W5VcOtW',
        'uHemWQnI',
        'W5HZW6FcJSoiW4KnWO0E',
        'WR1GW5BcVbhcQgC+BCkV',
        'W7qyW7hdOCoXWPDtW756W7q',
        'u3O3f8kE',
        'qSofW70ClSk4omo5imoR',
        'Ax4AW7JcSmoCpq',
        'pCoNo0RcVW',
        'WQPZW5qkWRnE',
        'W7PgW40',
        'WRRcJN7cHfeDW6mxWOO',
        'vSoLFmk9vq',
        'WRFcTxNdKCoD',
        'FWNcR8oaWPNdRSkPW70/',
        'FqOPWOOVxhmxW5tcPq',
        'wSovW6iNgq',
        'yYNdO8oKWRDJW6TSW786',
        'tLD6ASoQ',
        'muXYWOOveCov',
        'fv43WRuo',
        'W7eeW6ddSSoZ',
        'DZSeW67cV8oouSox',
        'Fr08',
        'W7u/W55tWQBcSSom',
        'WQNcMwNcHq',
        'WRDSF281W6jzW4pdKH8',
        'AHpdGmovWQe',
        'WQPDuMv2',
        'AdmiW49Z',
        'uayPqSkTWQxcHL4',
        'pINcOmohea',
        'WQyPWOPkWPpcQmomW6/dLmob',
        'W5j3W5S',
        'tGC+W7FcHa',
        '4PAEa+kwPCoXuSkLAc95W60',
        'YP/lV33HTltHT7RHTj3HTO184BwQ4BsB',
        'WOy0W5xcN8ki',
        '4PsJF/cHOzeuk2/cISo3v0u',
        'xCkqbhH3',
        'W48sW6JdJmoX',
        's05YDmoG',
        '4PEDi+kvIYb1WQLtW4NdKuS',
        'W75ToNCOW6e8',
        'rY96WQ0',
        'W6CJW4PBWOa',
        'qKHCW4tcMSoGuSoXiq',
        '4PAEvEkEG8kMW4FcR0BdVwBdPW',
        'AxjRW4FcRq',
        'xmkqlcBcJW',
        'WR9To282',
        'qtqOW5vd',
        'WR1lpgiw',
        'WRiO8l+CT3bN',
        'WOtdMmk2k1hcMbfoxWS',
        'WQ3dKN/cLfu',
        'vCkvWOZdKCkH',
        'FZ85Amka',
        '4PEMsUkvH8oSevVcUrZcTKq',
        'sq7dHSooWR0',
        'lezVWOOro8ovWQqFiq',
        '4PszwokvLmohiuX9c8oFW6K',
        'B8kqtbCVmvazgcS',
        'tLLPW5u',
        'vWWsW41E',
        '4PA8nSkjWRZdJmondCoitCof',
        '4PszwokvLmohivvPfmoFW6K',
        'W41oW5FcUmot',
        'W4JdMxtcQaCs',
        'CGzIWPyzg8orWRKimW',
        'WQiSW6hcPSk4WQBdU8kJWRu9',
        'AfTxW5dcPG',
        'WPahW7FcGmkS',
        'x0X5W4tcHmo2qCo3keW',
        'aSkDrG',
        'W7HnW53cOIVcOh0Y',
        '4PUIW7tHTztHT6/HTBxHT7FiNog1Nog3VSoY',
        '4PsJF+kbMCk9Dw9jW4xdRHG',
        'nM1KWPCM',
        '4PsVWOdILPzpx8kUmSo0i8kL',
        '77Y1w8kZ8ksdIYzD',
        'WOC9W7FcImko',
        'lN5oWOa7',
        'W7VcHCk1WRTNWRZdSa',
        '4PsepUkuOrZcImovkCkzyK8',
        'W43cQCkDWRXI',
        'qZ7dJCogWRi',
        'W6LwW4VcTcNcU2u',
        '77Yu77+t776a77Y077YC77YK77+Kdo+/Ro+8Qq',
        'pmkcWQW3WPGGWQK',
        'FbC6WOvMxhGfW5q',
        'E8o+A8kQzq',
        't8opW6qzfmk+lSo7pmoS',
        't1TqtSoa',
        'vsDRWRVcRNLMdCo0oa',
        'WRFdNSkKkuy',
        'qbiQx8kK',
        'WP/dG3lcSKFcMvpdKh3dSW',
        'WRJcQulcJSoy',
        'mmoLpvtdSedcOmkG',
        'wGe6t8k2WRxcKhJcJG0',
        'WR1aWRddQ8oXWQLfW6XUW7a',
        'W7vkW57cUrRcOh8/',
        'eZBcG8krbG',
        '772477+u77+O772Z77+i772577+P77Y17726W6O',
        'WRxdL3/cU0BdTW',
        'WOJcThRcP1u',
        'pSoUlti',
        'tYriWQRcIG',
        'mNitWQOyW6K',
        'W4NcU8krWQXt',
        'zZ4LFCkj',
        'WPfxwvr4',
        'bmkgW5TTsgddIW',
        'xCoIW4qLhq',
        'WRX2k3q0WQnfW7FdKuW',
        '4Pw5WPpWQjgjr8kWAuqSAhO',
        'uYfGWR/cHfPGg8okpa',
        'tYTGWQVcLx8',
        'WOKZcSkgAq',
        'i3qiWQSn',
        'W6L9W40hWRnabW',
        '4Psfz+kwI8kHW6T4W6HJW6qK',
        'WRe3W63cUmkTWOtcUSk+WQ97',
        'WRRcPNtdVG',
        '4PA94PEf4PsNs1S',
        'qslcVSokWO/dSCkP',
        'x8kqkqlcSW',
        'W74AW77dSSoXWRrc',
        'CLrNW47cOa',
        'pWNcVSkalq',
        'W6XTW7NdRW',
        'W7LMW7xdSGKzwSorWOVcMa',
        '4PsfupcOHyBdHJZdLJukE8kc',
        'W5NcLcRdSK4mW6pcOKlcQa',
        'WPRcTxldV8otfbJdPdpdIG',
        'uG0Z',
        'BmkVgvr3',
        'W6SCW7tdO8o7WPDtW756W7q',
        'W6VcMCk5WRCYWQFdU8okw0m',
        'WR19W7ygWQfxvu4XWOm',
        'sZyyW7y',
        'W5mgW4pdNmoK',
        'oNnxW47cU8oDf8oaWRRcGG',
        '8kIBIo+4JSozxU+9L+++NU+/O++9Hw3VVlxVVRS',
        '4PsDW4NILyzoW5ddPbzlkSoo',
        'nSogoSoGjq',
        'jHm8EmogCSoNmajQ',
        'u1fWW4BcJmk9wCoMiW',
        'rx8iW6LDyKBcGmoXFq',
        'WQXMl2W6WQ5t',
        'WRddTupcSgS',
        'oLvOWRrQtdWcW5xcVq',
        'sdieWPnk',
        'p8kGWQGTWP0',
        'jmkXoa',
        'nmoUluVdPepcOa',
        'W70IW4HdWRlcOCom',
        'Cmkydwb6',
        'yrtdPW',
        '4PM/i+g1H+g0J+g1UUg3ISQ24BAI4BAXhW',
        'suyKs8kS',
        'uauRsCk9WOZcHL7cJqG',
        'imo7pCoCmW',
        'ECk4WQu7WO4/W6X8pmkV',
        'uX0eW5hcTq',
        'W6XRW6NcUXGcr8ksWO3cKG',
        '4PA8nUkcGColW6xdJW3cGvldKW',
        'WQVcT1BdMCob',
        'WOJcJKJdO8ox',
        'xmkuWO3dJmoFnbe',
        'WRBdJ3RcQKVcNHldIh7cQG',
        'WPb4W6/dM1xdOqeYW4NcIq',
        'wSoEoCo2fmo7q0qYkG',
        'sIBdSmoUWRy',
        'v8kjW5a',
        'rCkYgL9v',
        'st3cImoTkmkfW4v/WQW',
        'W6PoW6NdQZa',
        'DqxdSH9PxWddJSkoW7G',
        'hCowzSkVBq',
        'm8kpW79wAW',
        'WOhcL3dcG8o7',
        'W5NcImkfWRLM',
        'vCkFWPRdJSklnGpdRSoWhq',
        'sCkBWO3dLSkbxW',
        'kSo+nMhdPG',
        'W5dcSSkEW4mU',
        'W4ukW6PsWR4',
        'WROPW6FcO8k6WRhdU8k/WRr/',
        '4PwaW7tIGA7dGhRcLmo5n8kEWQy',
        'W5H7WQ/dRbimr8obWOhcJq',
        '4PA8nUkwV8olWORdMqNcJexdGG',
        'W6XPc1G4WQjV',
        'WPddIvJcSuG',
        '8j2aOeWq77Y/772u77YC772FxE+9Q++9La',
        '4PsZ4PEv4Pwn4PEH4Pwv4PEX4PAD4PwA4PE64PEt',
        'WRDUpMC+WObtW5BdH14',
        'WQrCe8o5vtNdMa',
        'W6H6W6tdVrmv',
        'zXrx',
        'hSk1WO5Iiq',
        'triWu8kk',
        'WQNcVxFdUSoH',
        'vYNcUSooWP/dTSog',
        '4PsGBJRVU4pIGii3urhdItGJAG',
        'wLO0hSkL',
        'W5fHW4/cMIy',
        'BriYWQrd',
        'nCk0WPLyfCkuW6m7CNq',
        'yHePC8kv',
        'WO/cVeJcQ8op',
        'vbS9W7VcMa',
        '4PsGBUkCNCoSWQ9YCKJdMJi',
        'WO7cOvNcSCoqW7/cLmkbDmow',
        'WPO8W6FcMCkP',
        'DCovxCkOra',
        'W6FdPxZcKGW',
        'WO/cOe7cRCosW7tcPCkuqmol',
        'WQD0BuDF',
        '4PwAWQT0CmoQu8oLWQFcKvC',
        'WQ3cNeZdP8o7',
        's8kdWO/dSmoA',
        '4PMLWO3HT53HTyhHTilHTR/kVog1QEg0Mei',
        'r8ojW7KC',
        'W5P6W4BcN8obW59zWOvbW4u',
        'n8k7amkpn8krW7a+WQ/cUW',
        'DWVcG8o9WQK',
        'W4ldKuZcHsW',
        '4Psfz+kcTCkHWPj4W7HUW6j3',
        'mK0HWOOrfCofWQujsG',
        'FYldSSo1',
        'A3ftwCokW4e',
        'WONcT2JcN0q',
        'xmkaWQDpmSkKpmo0l8oG',
        '4PAy4PEJ4PEf4PAL4Pw54PEa4PEC4Pwx4Pso4PwA',
        'nxiBWRakW6NdMW',
        'Ff0tjmkctmkMWOJcIYO',
        '4PEhWO3IG6DUDSolwu5pjW',
        'kf1UWPC9eG',
        'W614W7ldRXSzrSobW4ddKa',
        'yCoEA8kBqa',
        'WObBW70/WPO',
        'WRHAW6WRWOC',
        'WQ/dImk8',
        'ASkBWQVdJSom',
        'DG0VA8k1',
        'WRVcK2pcK0G2W6KEWP0',
        'av5Zh8oSW7tcK0ZcMbGfEW',
        'zmkth0LUeLa',
        'n8kGjCkom8kd',
        'lb3cUCk3jwhdIgFdTCkI',
        'jf1mWPWhbCorWRaj',
        'W75zW7ddTdW',
        'W7GGWOXAW6ygh38ZWR3dUSoJWO4',
        'W6tcGmoLde/dL18fpqe',
        'FCktfe4',
        '4Pw24PwW4PAs4PwS4PsC4PsT4Pww4PAM4PE74PAr',
        'W6HPW7pdRXmowSocWOhcKW',
        'Dqm8CCkd',
        'xba+s8k2WQxcHKNcQGW',
        'x8onW6myfq',
        'jxfxWRqG',
        'vCoxumkquG',
        'WQHDxCo+uJlcLwSLvW',
        'FICSt8kq',
        'WR0CW77dSSoXWQHyW6H9WRu',
        'lH3cPmkTj2hdJgZcUmkO',
        '4Psi4PE34PwT4Ps74Pso4Pw04Ps04PwS4Pw84Pwj',
        'tCkpW4PUshtcPf8',
        'pmkuWQ0NWRO9WRHZ',
        'W7PlWRdcQ8k0WPLdW759W7O',
        'gXRcTmkUpclcINldQSkP',
        'n8o/zblcJW',
        'trVdLc9k',
        'Aej6',
        'DJxdUmo1WQP0W6vPW5WY',
        'WQHQo2u0WObtW5BdH14',
        'WROQW6u',
        'hCk8W5bLFey9umkL',
        'jSkSomkfoSkuW7K/WQ/cTW',
        'WR7cQh7cLaTy',
        'gmoMgmokbq',
        'W7yUW5vu',
        'WQ/cUhldSmot',
        '4PET4Pw04PAr4PAh4PAv4PEB4Ps34PAm4Psi4PAu',
        'W7O2W4NdSCoq',
        'WRjAcCk/ewVdPhOPvq',
        'WQXZe0GO',
        'W5NdKtVcGHSsW6pcOXhdPa',
        'wSoetSkCDq',
        'm09N',
        'DSodW74Qba',
        'CWxdVebVstBdHmkoWQO',
        'W7nhW6BdVXS',
        'Dt4ZyCkU',
        't8o1W74/ga',
        'W6K/WPOUWRngb30IWP8',
        'EdCdW7G',
        'DvCdiSkotSkTWO8',
        'l8kbnmkXiq',
        'W73cKSk+WQ53WRRdPSohvIa',
        'ytxdUmo0WRvAW69XW7aZ',
        'sCoyW68mbmk4oa',
        'W7bgWPNcOHNcVsLMC8o2',
        'yZFdHmoaWR8',
        'WOFcQ17cRCoCWRRcJSkAa8oQ',
        'WO82W7pcHmkB',
        'Dr4U',
        'WRm9W6VcVSkPWQFcImk1WRvX',
        'WOddLKRcK04',
        'FYCnW6/cHa',
        '4PABkmkZ77Qu4Okztx/dVCkUWRRcRCkU',
        'zSkSWPddGCoooIS',
        'WR1YhSoosa',
        'W6ubW53dO8oNWQLxW6PS',
        'xbW+s8kQ',
        'hCowka',
        '4Ps7WQ/ILj3dKIWzxmkCWO4M',
        'jG3cMSkMpq',
        'W64qW77dOSozWR9fW75OW7i',
        'aX5VWQxcK35Rd8kgDW',
        'dCoIlKJdPG',
        'bqdcUSkKfa',
        'W4naW6NdM1xcRNK',
        'yHGPvmkY',
        'WQH8W44aWRjxs2GKWPu',
        'WOPfW7ecWPG',
        '4PA04PAS4PEe4Pwp4PsI4PA54Ps94PwV4PsC4PwJ',
        'DHeVySkpDCoRlazW',
        'sW0NqCkUWQq',
        'qrWhs8kRWRlcGKRcMW',
        '4PEAWOlWMAcsaSoxoColE8k9WPy',
        'ydXiWOBcQq',
        '4Ps7WQ/IGkVdKKWufCkVWRbJ',
        'WRNcUM/dUSozhG',
        'hZVcGCkkpW',
        'WRBcTxldV8kFEG',
        '4PEFW7tILiFcS8kyevBdPdxcHG',
        'bGRcPCkXncBdGa',
        'k8kFWQG3WPK9WQn1eCkS',
        'cJxcH8kydq',
        'WPZdVguLomkHBCk/dCk4',
        'gCkOWQr+cq',
        'rJX8WQpcKW',
        'W4S2W4dcHmoaW4LzWOfkWPy',
        'x3yfj8kA',
        '4PEhWO3IL5LUdCokwr9ObW',
        'm8kMkCkgpCki',
        'cSoAmCoFeW',
        'WOhdLmkRpeO',
        'xG0+ACkQWQ7cLL3cRqW',
        'W4vwpCk5uKVcUqtdRs0',
        'qcOdWQHn',
        'E8ktWPZdO8o/',
        'WQPaW7/dJ1y',
        'yHuXC8ksC8kIpuD8',
        'f8oecmoVea',
        'WR9Tk2K8WR9zW5ddHfi',
        '4PwQCokxUCk+DCkvW5DOW4FdLW',
        'm0CUWPysemkqW7Pmda',
        'gCoCmSoXaSoIugGVBa',
        '77Y3772v772P77+j77YRgo+8To+9HE++LU+/Uq',
        'Dqq8zmkszCovnrn2',
        'WRRcVxFdP8otaG',
        'W7NdGxRcSalcMrBdIhFcPW',
        'WPTFxLb2',
        'hCkkWOVdISonpbRdUCkIca',
        'WRrwe8o7Cs7dHNWHrG',
        'mmkoWQGZW405WQLOpCkH',
        'DbuTESkhDCoN',
        'WR7dH28',
        'xSk7au14',
        'WPxdUCkcbxa',
        'W6NHTj/HTR9j4P6L4PsZ4PsM4Psm4Ps+W7O',
        'W4JcVSkzWRrE',
        'z8kHhXBcUW',
        'CM5zxCosW50zWO5ZdG',
        'WOZcVfxcQCoWW78',
        'W7RcMmk8WR1MWQ3cRW',
        'Ar0MWOncxw8tW5VcRG',
        'W7bTWQhdTH8EqmotWOFcMa',
        'jGxdUGb4jG',
        'FCkca1rgeq',
        'WQmOjSkbtG',
        'nCkFWQCZWPK8',
        'mmoKmalcRWq',
        'z8kEnrZcMSkD',
        'WQuGW6ZcQCk4WQBcKmkPWQjw',
        'gmoRzSkfBbDAWP/cHKK',
        'WQbQgmoBAG',
        '4PA/W6tWRzknCCoSrCkOwCkYvq',
        'd8k6W4fMFfCTh8k0W74',
        'WQvWW6SyWRW',
        'bG7cSCkMeW',
        'qZ/cR8oUWOJdQSk5W78XW44',
        'nuDIWPubeSovWQq',
        'WQj1W7xdLhm',
        'W7xcMmkP',
        '4Pw34PwF4Pw24PAC4P6SWONHTjxHTRJHT5tHT6e',
        'sSobW4HUutdcReNcOMm',
        'tcHOW6ZdJdDhbmowpG',
        'x05JW47cMW',
        'v1LIW5lcImo0vG',
        'qxqkgSkl',
        'W4mXW4POWQi',
        'nCk9kCkxg8kEW78+WRBcTW',
        'W6qIW4ne',
        'ysldOW',
        'CXuPWObQDxKtW4NcQa',
        'bqFcPSkBla',
        '4Ps+W5RIL6xcHCkfjHpdQmoYca',
        'WQOJEsa6WQnyW4RdGve',
        'ohfZWPWz',
        'WQ3dI3BcU1hcIrldIwi',
        'st/cQmoAWPVdOSkPWOu',
        'W7JcLmkHW5CmWQdcQsn8EW',
        'uWv4WRRcKa',
        'omkDWQWNW6C',
        '4PQbF+g1O+g2KUg0LEg0HSQT4BEI4BAgvW',
        'CHuLyG',
        'W4KDW71bWRS',
        'W7L4W6tdQvO+umoBWPpcJG',
        'rcT6WPZcK35ZcConoa',
        'WRD/qa',
        'W7zgW4a',
        'n8o/n1tdReRcRSoP',
        'jSk1imkmDmoDWRWFWP7cVG',
        'W5hcR8kNWOX6',
        'DrK6WOmVftWZW5lcPG',
        'puD1WPahaSozWRqhjq',
        'cadcUmk0mdpdLMpdRmkP',
        'tSojW6GdfmktnSoWpG',
        'vCoGBCkxxqThWPFcLci',
        'WQH8W44aWQvgtM47WPu',
        'WO9ZW5mfWRnwb3K/W5a',
        'qZ/cTComWOJdPmkG',
        '4PEtoUkuQaezWRxdIJ/cJvG',
        '4PEDi+kbVsaAWQnpW4RdMLO',
        'qsOFW7rBteJcLSoWfG',
        'kCopm2VdTa',
        'WQVdQCksd0W',
        'fbnYW47cHmo+uSo4ihi',
        'uIOv',
        '4PEhWO3IL5LUdCopwq9PcG',
        'smopW6KAhmkPm8oUh8oS',
        'W7JcQ8kTW40/',
        'W4zoW7xcPSoW',
        'BSoHW4K1iq',
        'WRtdH2JcRupcMHy',
        'WOSNnSk/teJcUXm',
        'W6XZW5FcN8onW4iEWPS',
        'W5NcL8k3W4ekW6hdShzymG',
        'AdShW7hcV8okuG',
        '4PEr4PsB4PwBkZ0',
        'WQL2nwSH',
        'ASkfnc3cPW',
        'WPFcLvtdT8oh',
        'BmkQkurr',
        'WRPHW5SoWRm',
        'yr0PW59Y',
        'WOBdJmkDhwi',
        'W4ddKwJcSq8gW6m',
        'WQrhfmoWuHtdKwOSra',
        'st/cQmoAWPVdOSkPW7W',
        'qCofW7KCemkRoa',
        'lmkkWQ01WPKXWPn4iCkU',
        'WPldI27cUvO',
        'W4KGW4PLWQy',
        'FCkcbvrObG',
        'haxcRmkbgq',
        'DWyAymkE',
        'sr8fWRn4',
        'BmkocvL6ava',
        'W6rNW59vWR/cO8oDW73dG8kn',
        '4PM8W5ZHTiNHT77HTidHTzxiJEg1Vog3TMG',
        'iCk9lSkmmq',
        'W6VdHvNcPWK',
        'WQzggCo2uWBdKhWZqa',
        'WRJcJ2lcKey3W4qvWPuN',
        'Aa9zWPBcMa',
        'W7HtW5hcTbhcRhS7CSoi',
        'WOzIW7ldKvhdQG',
        'FIVdO8osWQi',
        'W5ekW5zfWPW',
        'YOplKvFHTR/HT4lHTQlHTlJcHog3KUg3QW',
        '4PsBeVcJKPZdJWpcI8kuWQC7W4e',
        '4PwZW6BIL7CxsCovW6qHo2y',
        'W550W7lcUJi',
        'sSkikK7cISo/bWiLW4W',
        'lmkNW4f+BWuGuCoGW7a',
        'dSkWW4C',
        'W5FcJ8kxW4S6',
        'zXqWF8ki',
        'lCk2WQqHWQC',
        'tSksWOVdKmom',
        'WPfPW6VdL0RdOtKwW4G',
        'lCktWQqXWP4GWQ12pG',
        'W5LeW5lcTI4',
        'W6ldN3ZcGd4',
        'W5vHW5RcJ8oa',
        'W4KeW5ZdG8oU',
        'WPeMpSk5Dq',
        'l8oIoL3dQMNcOmkGWO0w',
        'hCkUWRjplq',
        'W4ddU1lcRZO',
        'ANTtsmopW5COWPHJjq',
        'ALhdNGH5rtBcJCoW',
        'WQddRKRcPKe',
        'WODuu8oQtW',
        'FCkgnWpcN8o5bG',
        'fCkOWP9EcmoA',
        'WRFdJwW',
        'WQRdKNFcT1y',
        'xv9AW4xcVG',
        'yahdK8o0WPa',
        '4Psfz+kwG8kHW6TJW6nUW6u4',
        'bmk0WOjA',
        'W4JcSceVnSk1',
        '4PQe77UUWOKO77Yz77Y177+T77Yj77+777YK776c',
        'WRP3W5qnWPTxvh4XWPC',
        'dmkMWRK',
        '8jgXRthcI++/HU++Po+8NE++S++9TIhVVj4',
        'AJOSW4DC',
        'dCkZcCkUgq',
        'rttcV8ofWP/dImkPW7WrW4O',
        'bIxcNCk+omklW4XUW4FdMG',
        'W55FW6tcOSor',
        '8k6UQhddJG',
        'kCo6hCo9iW',
        'WQpdG13cR2G',
        'WQC6vK5wWQhdJ1y',
        'badcVCoIEMhcI2tdUSoG',
        'W4ddM3/cPW',
        'At8qW7G',
        'D8kDoWNdNSo6b1e6W4q',
        'WQr3W5qCWOLwshO+WPW',
        'sCosW7GaaW',
        'xSorW4Kbaq',
        'W6SWBdHPW7rpW7hdKwOJWQS',
        'WP5FFKDX',
        '4PwfjUkvPSoKuCoXWRJcP8onW4G',
        'WRn/emoQDG',
        'FCkjW5FdKSodnaldR8oJca',
        'qsJcQCogWOG',
        'WRu6gqfZWRBdHZNcNe0',
        'BX5x',
        'W73dKtZcHKqWWQ1wW5mF',
        'eNW4W7/dKsm9gSoAegaVW64',
        'wmkcWPZdHSoEirm',
        'z8k0mhi',
        'CXCMWRHRxxafW47cRa',
        'W41ZW4lcJ8oIW4uvWO13W48',
        'W5q2WOZdI8kkW5GnW4GjWPy',
        'WQ3cNx3cNcS',
        'wbGH',
        'DmkQWPVdRmoB',
        'WRVcU3tdT8oucv3dNtNcMq',
        '4Ps6sokvNG7dTSk4WPDBWPCn',
        'W74qW6ddSSk0WRLEW6XLW7K',
        '4PsBeUkvRhhdGuRcUSkfW6zI',
        'sGCNsW',
        'FmkpbL1m',
        'sI7cSSoDWPVdOSo2',
        'WPNcM3RcLNm',
        'WRvQm2W',
        'rCkpW51RsxhcPNpcOg8',
        'WReGW7y',
        'dGWJWPhdKmkRuCozdhfQW6S',
        'DZ3cLSo9WO0',
        '77+e77Y+776P776n77Yo',
        'vmkkmM1N',
        'WRGQW7u',
        'tGpdGWPF',
        'FXXOWOv2aJzaW7O',
        '4PwfjVcHSiHFWRdcLSk2W4NdNmo8',
        'WPpcTL7cVKG',
        'wv9+W5tcH8oNe8oHlxu',
        'WQ1Mk246WQbt',
        'W77HTi7HTzOG4PYO4PEm4Ps34PAK4PEAnq',
        '4Pwo4Pwp4Psp4PEn4P6tn+g0P+g1Tog2SUg1KG',
        'W4RcULxdPa',
        'vmolW5ilpq',
        '4PEa4PA14PsA4PEd4PYCqEg2Pog3JEg0UUg3HG',
        'tdLGWQNcK1LWbCoBoa',
        'WRFdImkX',
        'W7T5W5JcQaW',
        'mMSOWQ4k',
        '4PEtoUkuQaezWQpdMtpcHuC',
        'rIaJWPNcSG',
        'gq7cUmkMoIW',
        'W65pWRRcJa',
        '4Psfz+kwI8kHW6T2W6rXW7GJ',
        'FmkWp3jtdIefWQry',
        'zmkbofb4',
        'WRLMkW',
        'sCkwW71OsG',
        'CSk4kG',
        'yX48DmkkC8oM',
        'hmk7W5b0CeaNs8kZWRa',
        'W6tcNmkwWQLy',
        'W7tcHCkrW7aw',
        'WQ8oW53cUbVcOh0',
        'zSkPn3zDjJy7WRjk',
        'WQ/dHmkMjrK',
        'wSorm8oXr8oVveuGFG',
        'yCodW7WdpG',
        'WQnChSoQus7dM3Snra',
        '4PsBeVcJLOdVU6ajW6lcUmkJi8kEWP4',
        'D8kkp2q',
        'nMKuWRCAW5FcTmk3W5xdIa',
        '4PsVWOdILPzpx8kHomo0pCkL',
        'hSkYW4e9',
        'DttdTSoMWQa',
        'WOTjqeHuWRJdJI7cTq',
        '4Ps5hokaS8kbWQFdPL7dTcfZ',
        'g8owoCoIkW',
        'vmkjWRtdISopmatdVCo2fW',
        'WRNcGmkRW5byWQFcRZLIEW',
        'v8keW4DMChxcSL/cRMy',
        'jf1eWRyS',
        'W4DIWP3dI8kjWOW6WP1xW4i',
        'ngnW',
        'gCoJmSoUlG',
        'DX0MWPjqx24pW4/cUq',
        'xCoYW60IjG',
        '4PEMsUkvJ8oSev3cQaldS0q',
        'WP9Iemovsa',
        'WQPUdxG8',
        'gqKMqSos',
        'lCkxWPSSWOO',
        'W7VcKmk/WRj7WQxdVmoEFtS',
        'CrCww8kK',
        'WQi8j8kjDq',
        'WRNHT6/HT4hcHokCI+kxGokxNokvL+kvOve',
        '4PAW4PE94Psq4PEW4P2tCUg2R+g1P+g3Uog1HW',
        'WQbwhmokwa',
        'hSktWR5Ar8o7zCkJqG',
        '4PwAWQVILyiyWQTfWQVcP8kxea',
        'W6RcH8kQW4a1WQtcRIvUpa',
        '4PwFcEkuNCozwGldKCkWdsW',
        'rtmEW6LrCG3cV8owpa',
        'cmktm8oRc8oJbeiUzW',
        '4PEtoUkuQaezWRldHsJcGvW',
        '4PwFcEkuNCozwGxdLCkJccu',
        'W71KWQhdLXmdwmkiW4RdTW',
        'kCouh8oaea',
        'WP8DW43cGSkr',
        'W7j5W6ddMGm',
        'W4xdSeZcHrS',
        'W4T5W4RcHSofW4SC',
        'W7yqW6K',
        'W4DcW5RcUb4',
        'WOpcMwlcQSo0',
        'kSoUmfZdIehcTSkGWP8q',
        'W6TTW63dVHKzvSowWQlcIa',
        'cSk6W51NEfC6xSk0W7G',
        'qmkeW4vNsxxcOedcO14',
        'Yz7kVf3HTR3HTkdHTydHTROV4Bwn4BsK',
        'WPddS3FcRLy',
        '4PsDW4NILyzoW5ddPaPqpmoc',
        'vG4S',
        'W5JcR8kPW5e3',
        'W7CtW4FdLCoq',
        'DCoNxCkXCa',
        'W5DzW6xdGsK',
        'W6RdSg7cTbS',
        'xCoBzmkCzW',
        'mCkXpmkmnCktW7K',
        'jmk3b8keaW',
        'jSkSkCkdiCkeW7K',
        'x8oQFq',
        'lSkXp8ktnCkxW7K',
        'WQVdH8kQhuu',
        '776A77YM776m77+z776qWOzz4PMi77IRWRWe',
        'W6LvW7pdQCoWWR88',
        'AYCHW47cIq',
        's8o6yCkRyq',
        'C8kinaRdNW',
        'AfmcjCkgsSkHWOZcPYe',
        'vYfDWRJcK35RdW',
        'xvLL',
        'W6rBW4BcJ8onW40K',
        '4PsepUkuOrZcImozkmkjBGS',
        'gmkpWOj4kG',
        '4PUkt+g3JUg3JEg1Tog1HSIL4Bsf4BADW6a',
        'puD1WPaaf8ox',
        'amk4W5j2EgGStmkZW7a',
        'Ds8WF8kP',
        'yYRdUmoRWQX6W6n9',
        'ymkztfzMbKfnugG',
        'W51eWPFcPa8',
        'WR/cKwlcTMS',
        'iMmwWQelW78',
        'FXaOxCkQ',
        'W4JcOta1',
        'ySosW4yjga',
        'W7lcPNRdUSoAb1NdQxlcIW',
        'i28yWQe3',
        'vHeHW5fE',
        'W4ZdMM/cQWOeW6RcTexcRa',
        'hmkHW5W8BKq/wSoGW6i',
        'CCkXFJGwcIOfWQny',
        '4PEEW5ZILi3dKq8/W6iFWPzO',
        'W7hcISk+WRr9WQNdSCkS',
        'egRdQCkzW4pcVCkUW4aQW5TZxG',
        '8j6TOCkzzW',
        'aSkZWQq1WOOXWPe',
        'tITGWRNcVNrTcCoxmW',
        'W4/cQc0Kiq',
        'ASolW75JW59HW7XjjCkQWRFcU2q',
        'kCkZWO14ka',
        't8opW64kuCkIomo/lmoG',
        'us/dTSo1WRzwW7P1WPS',
        'umkFWORdLSokmHpdRW',
        'WQZcPNtdVSozbf0',
        'WRVcSw8',
        'zXxdVGrZ',
        'W47cTmkCWQH9',
        'dNayW7jzBeZcI8oNba',
        'uZJcImodWOS',
        'k3eUWQ4i',
        'vSkFWOa',
        'dcJcImo9lSkqW4C',
        'WOSpjmk/',
        'bmkYWP9OcCorW70',
        'sCkaW6SbcmoSp8o1pmkL',
        'W6TAW4VdUs0',
        'tCkmlHRcL8o5bvfd',
        'WRaeW5rDWR7cP8ohW7ZdLmkh',
        'smkXnIdcMq',
        'qSktW4zV',
        'WRFdTgJdP8oFe1pdTs7cMq',
        '4PsNW4hILRuIe2tcTvJdR0e',
        'FMvWW4JcKa',
        'x1rOW6FcRW',
        'BIOyW7pcL8on',
        'WQRdSL/cIve',
        'WOjIW7ldKvldRr0u',
        'DmkgW4Pira',
        'mSoBkSoQlG',
        'lSkXiSkv',
        'o8knW6f3Ea',
        'hmkIW7vJFW',
        'W7HqW4RcSbVcRa',
        'Fh5KW6ZcMa',
        'EYOw',
        'W6JcRtGXmG',
        'qY84W6JcIG',
        'WQJcUZVdKSo4krJdSJpcNG',
        'W7HrW73cLbC',
        'W7lcH8k9',
        'zX/dPWrPttddUmkjW7u',
        'gCk6W51IEgGStmkZW7a',
        'xmofW6qlgmkIoSkq',
        'WR4qW5BcMmk7',
        'AdSAW7lcQmom',
        'hCknFmkOr8ozuvi1zq',
        'gmokCCkcBqLbW57cHte',
        '4PswW710xvK0zalcUbK',
        'WQhdLCkGlvBdJfK',
        'ysJcQCogWOJcPCkLW6fcW4W',
        'jUg1VEg1MdBINPxILjFILOpILz3ILiKu',
        '4Ps5hdVdTmkAW7juW7n+kW',
        't8kUcK9z',
        'cZ3cNSozeq',
        '4PskW5BILBGAirfuaX4T',
        'W5zSW7RcMrS',
        'YydiRtVHT7ZHTl7HT7BHTBZcHog0N+g3LG',
        'W61IW5xcPWq',
        'WRuCj8kGEW',
        'xX8OqSktDmoNFazR',
        'WRJdKgNcV1VcNWBdGNtcTG',
        'Bmkohfn9eey',
        'mCkLd8koja',
        '8jIWV3Pe77+A776Y772o77Yh7729776aWOW',
        '4PsepHDUW4FdLIlcKMPv',
        'xrOJqmkZ',
        'gmo+hCoKea',
        'usBdVWHT',
        'FCkikHRcL8o4da',
        'W493W5hcN8onW48qWPHfW5G',
        'u0PcW6/cUq',
        'tmkoiItcMW',
        'vSkpdIhcLq',
        'W5VdNx7cTsepW6xcThZcRa',
        'veGxe8kR',
        'W7eCW6BdOW',
        'WQWYW6dcVmkP',
        'ESkmpa/cI8o7fMu7W4O',
        '4PABkmk077Qu4OkztwddL8koWPNcRCkk',
        'W7GhW6ldQCoM',
        'vGW1W7NcTq',
        '4PskW5zy77I14OoSvxadcs0jW6e',
        'WQfjmSohEW',
        'yWpdOaGx',
        'lmk5lCkupCktW703WPFcQW',
        'uJybW7lcLW',
        'bf1RWOm1',
        '4Pw5WPn2W40iW60evs4Q',
        'yZ/dSSoIWRbJW68',
        'tCk9paZcNW',
        'cYFcJ8oliW',
        'WRL0uWf9WRldHJNcMWG',
        'yWJdTCo3WOW',
        'WPddHmk1pKa',
        'W71WW6tdUa8zvG',
        'zSk4mNbvnYesWPvm',
        'WOahi8kGxL3cUqxdMq',
        '4PsB4PwF4PsyWPFdLa',
        '772f772GW4FcVVcPOllcQba',
        'Y7djMSkt4BsZ4Bsb4BsU4Bwgh+g3JEg2La',
        'WQP3nM48WR4',
        '4PwR4PwW4PAs4PwS4P2Vdog1TEg2U+g3SEg2NW',
        'W5TRW4RcQW8',
        'W4D8W4ZcRmoD',
        'WRBcJfJcUeu',
        'AmkapGVcKCoAb1e6W4q',
        '4PwfjUkvPSoKuCo7WQtcSmojW4S',
        'BrtdQG',
        'DSkmEGlcL8o5cqiGW4S',
        'W4JdJg/cPWafW6pcTwxcRa',
        'WO09W7W',
        'qmo7rmkxCqHuWPNcHW',
        'EmkiWOVdISozDr/dSSkIgq',
        'kdRcQSoreG',
        'E8khpH3cQCo+fKO',
        'WR4FW47cTmkp',
        '4PwZW6BIL7CxsCozW78HnZu',
        'WQbHW44BWR9quNK5WP8',
        'WPDDrKHD',
        'DufosmohW4WZWO4',
        'EW08WOHTuxm/W5xcRW',
        '4PEkmUkwPKNdUf5oEZxcGW',
        'umkTW4r3DW',
        'ErnOWPrGvxKpW5tcRa',
        'WQX9W6ddU3K',
        'smkjWPZcN8kbxW',
        'W4ZdMM/cQX0vW6/cSLRcRa',
        'dJxcMq',
        'neWHWPqrbCodWRyljq',
        'CZmwW7RcU8oKuSoxWQZcJW',
        'WR0PmCkVuW',
        'WRHkmwmX',
        'W7XTW63dVG4iuSoEWOZcOG',
        'sKXPW7tcMa',
        'lmo9nwhdQa',
        'v0H5CCod',
        'WQ7cKhdcGq',
        'W7ZdGSoPWOqTWRhcUtD7pG',
        'dWRcUSkNistcHwpdTSk0',
        'W7OhW7/dS8oK',
        'rYTIWQNcLxi',
        'svrYC8op',
        'WRBcMwJcGG',
        'zSkZivbU',
        'W7bzrLG9',
        'kwKEWQygW7/dMW',
        'W6ldKx7cHWm',
        'EZadW7tcUCoBwmorWQ/cGW',
        'W5ZcHmkMWPbJ',
        'aJxcLa',
        '4PEDi+kvGYb1WR1FW4VdKX8',
        'WOXNhKSC',
        'mCkXiCkpimkvW5yYWP8',
        'uCoHASkEDX9qWO0',
        '4PEkmUkwPKNdUfPoAJJcLG',
        'uc0sW6TvDuG',
        'WOasj8kPuu3cUrlcH0i',
        'YitkRmkz4BEZ4BwG4BEc4BsgEUg0K+g2Ga',
        'yXKiW7z3',
        '4PwFcEkuLCozwH7dMCkZctq',
        '4PwOt/gkSi51A8oWDSoXWQZdRG',
        'u8klW4PVza',
        'WRBcMwG',
        'zX4PF8kcC8oUorn7',
        'gmoGoh/dPW',
        '4PswW71R77IA4OovyWyzWQmzWP/dMG',
        'rJzRWQ/cLgnG',
        'dSowjmoX',
        'FbBdSCo3WOS',
        'Arm2oCktEmoUmWr1',
        'Cv0EiSova8oc',
        'W7JcKmkNW4XyWQpcPhzKpG',
        'cW4OWPxdNCkIaCo8iKbhW6JdMG',
        'wCoJzmosl1TZWP/cGsy',
        'gMP0WO8y',
        'W57dHhtcRb0eWRZdSq',
        'pSk8WQrnaG',
        'BSo0d8kinCkEW7S+W5VcOq',
        'amk2W4DKB0bd',
        'W7HQW6hcOSkWWRNcUSkIWR9H',
        'AXuUzCkhCCoN',
        'WQ13nMmWWQHeW7RdL1y',
        'cSoQewVdOG',
        'WRFcImk3',
        'wZPdWQNcKMrKd8oC',
        'yHuXC8ksCW',
        '4PEPW64qWOhdHCo7WPFcHu/dMG',
        'W7tcPWiOea',
        'AXCiqSki',
        'CCkckxvx',
        '4PU577U1W4nE',
        'WRn7rfvEWRZdHq',
        'ifWBWR0p',
        'DSoKy8kBBW',
        'W4pdM2W',
        'Amkydv1Qgfadcwi',
        'gSkHW5jLAfzPeSoGW5i',
        'FdCBW7JcKmoiwSob',
        'WQhdH2VcL24',
        'WOXpvq',
        'dNRdTCoBWPVdQ8kOW6apWQe',
        'WQjlgmo8st/dKa',
        'WRZdThRcRwO',
        'xSobW74kxmkJk8o/oSoP',
        '77YO77YZ77Yq77YD776i776C7721W5CN8ksHNW',
        '4PwfjVcHTPrFWRdcHCkTW4VdJmk2',
        'WQj/re1wWRddJG',
        'dmkTW5zYAfeS',
        'iSkdWRHKr8oBW6r1jN0',
        'W4XLW4lcJmob',
        'W6iqW7rjWPW',
        'WOP5qgrc',
        'W5VcJ8kIWRDGW6JdVmoiaIG',
        'rdOxW7Haza',
        'xaiExSkU',
        'W6GMW6/dVG4',
        'pNi/WOSN',
        'eSkyWQqrWOe',
        'AXWhFSkl',
        'W5fZW5tcMmo7W4SCWOzbW4q',
        '4PAi4PwR4Pws4PEn4P2ncEg3VUg1QUg3Mog0Qa',
        'W4PLW7ZcTWK',
        'AtSdW63cRSo2umowWRdcMW',
        'fCkeWQrMlG',
        'kJ5+vmohW5yHWPGNca',
        'eCkOWP9Ec8oDW6q+dxO',
        'CX19WQpcOa',
        'gCkLWObQrW',
        'W5HKW4ZcNSouW6eCWPXfW5i',
        'W7pcMmkJWQTZWQ/dSa',
        'v1L1W4JcImoEvSoLn2a',
        'WRSGW7hcVSk8WRpcVG',
        'vGaPtmk7',
        'hCk4WOVdISokmrxdVCoXda',
        'W4tcGda3hq',
        'WRTNoMq',
        'yWiVECku',
        '4PEPW67WKBciWP3cSmkJWPPwW6TN',
        'zYdcT8kSW6vAW69RW6u+',
        'kebSWPWhaSorWROC',
        '4PwAWQVILyiyWQTgWQZcSCkseG',
        'v1n1W4tcTSoJrSo0kgG',
        'rZOpW41gAfVcHmo3eG',
        'W7ySW5RdGCos',
        'yXKYW6VcUa',
        'WQqYW50gWRLwrxq1W7O',
        'WOldThlcUKFcKI4',
        'WQvwdSo+sW',
        'BSkVWPZdQSot',
        'DsKzW7JcRmoMwCoiWQy',
        'umobW5P2xgtcQf/cU2G',
        'W5SxW6FdJ8ow',
        'tYOFWO1I',
        'WQrWz096',
        'WPjjl8oDCG',
        'qrOWxmk1',
        'WRVcPCkHW4ODWRpcVcjQEW',
        '4PEK4PwR4Pws4PEn4Ps+4PsO4PED4Pw34PEs4PsM',
        'WQxdG8kHiKBdTvKDBGm',
        'DrKNCW',
        'DHqsWQH2',
        'WQddImkPk1FdNq',
        'WR08fCkhAW',
        'sdiYWOXJ',
        'W5pcJmkLWOXq',
        'W4ZdKhJcOX0v',
        'A0ernSkkF8o6',
        'BmkiW61gua',
        '4PsDW4LR77MH4OcDWRCWrZNdICovqa',
        'jwfeWOeX',
        'vhtcTComWO4',
        'ySkgjxnR',
        'WRJcHhtcKLqMW6G',
        'W57dKxxcPImeW7xcOLdcRG',
        'WRddGSkWpe8',
        'W61tWRm',
        '8jsmJSkQrE+9LU+/RE+9So++V++9U8kVWP8',
        'WPNcULVcSmoiW6K',
        'W5xcQsKMnmklyCk4xSk6',
        'BSktga',
        'BtJdLHTU',
        'BX7dPH43jG',
        'u8klW5nbCq',
        'WR0ycSkgCa',
        '4PADW53dUSkiD8k6W7JdJ1e6',
        'CHe0EmklC8oSka',
        'W51ZW5dcISot',
        'WRSQW6BcGSkZWRJcOG',
        'vSovymkxAa',
        'WRpdJxlcSa',
        'WQHpu3jr',
        '4Psfug/VUjNIGiu2W4aZeZ7dN8kX',
        'WRdcMx/cHh4ZW6mpWPO7',
        'FaO9WPr7sN0uW5/cRq',
        'W4xcSqSwjW',
        'qJHVWQxcJxzNbmoC',
        'bsRcICo6la',
        'sHGMr8kS',
        'WPCpi8kGxKRcUq',
        'WOmUW7VcQmkp',
        'ddtcImo6',
        'guvQECk9WQpcKetcIGW',
        'W63cJCk8WRfM',
        'jMRcT8ouWRv7W6vKW7v3',
        'BNbEumotW5WJWO4',
        'W7OOW5jE',
        'WQ/cK2tcGuW3W6mpWPON',
        'lmkfcmkiia',
        'WObJW6JdJLVdTGaEW5JcKW',
        'gqRcU8kTistdR2VdVa',
        'CtSoW64',
        'WQtcQx/cISoW',
        'dGhcSSkXaIJdKwO',
        'W7ZHT5NHTj7cS+kFHEkvSEkuUEkwKEkuSSoG',
        'l8o4jMVdOq',
        'CtSo',
        '4Psfz/c6Oy3dPt3dIgRdPxDQ',
        'WQJcSuJdP8oegvBdTW',
        'W57dLxZcPW',
        'WQj4W6/dVhu',
        'vSobWPS2hxJcRLNcVxi',
        '4PswW73WQlozfMKfgmkJumoC',
        'W6PgW5JcPrtcRhS',
        '4PwQW7xWS6oDpq8lxSkZW7Ho',
        'WRnAe8o4tW',
        'FtSd',
        'W5xcTW4Ui8kXzCk5sCk+',
        'pCkFWQ81WPG4WRHCpmkV',
        't8oQzCkrBrzqWQhcJs0',
        'WPpcG2NcOSow',
        'WQbwcq',
        'WPxcS1BdOmoo',
        '4PEGlokwMSkyemoVgGZdN8oA',
        'ud1VWQVcHee3',
        'W5PUW4BcImorW5GC',
        'W47dM3xcTaStW7xcSexcOa',
        'vCoHW5SJgW',
        'WQpcI0JcQ8o+',
        'W5rZW5O',
        'rCotW4CafCkPl8o7pmoQ',
        'rCo1W4jKCLeStmok',
        'smkxWPVdGmozxW',
        '4PER4PEp4Ps74PEf4PA84PAB4PE74PE04PsI4PA+',
        'WPeEoSkIwfO',
        'oSk+nNrylseAW7Gj',
        'sCktWPBdI8o0pH/dV8oP',
        'ga7cSCkN',
        'WP0EhSkPtfRcVrhcTG',
        'WO7cNxtcTSo0'
    ];
    _0x5675 = function () {
        return _0x19e5e9;
    };
    return _0x5675();
}
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url), __dirname = dirname(__filename), groupMetadataCache = new Map(), CACHE_TTL = 0xea60, messageCache = new Map(), MESSAGE_CACHE_TTL = 0x5 * 0x3c * 0x3e8, mutedUsers = new Map();
let commands = new Map(), commandsLoaded = ![], commandsLoadPromise = null;
commandsLoadPromise = ((async () => {
    const _0x5235a5 = _0x3337, _0x102f5c = {
            'DHcGG': function (_0x5961e8) {
                return _0x5961e8();
            }
        };
    commands = await _0x102f5c['DHcGG'](loadCommands), commandsLoaded = !![], console[_0x5235a5(0x665, '8*C0')](_0x5235a5(0x4b2, '(49)') + _0x5235a5(0xaaa, '[dUU') + commands[_0x5235a5(0x91a, '%iYw')] + (_0x5235a5(0xaaf, '9M@a') + _0x5235a5(0x93e, '[qEW'))), console['log'](_0x5235a5(0xa5d, 'y7P]') + _0x5235a5(0x469, 'Dzp9') + Array[_0x5235a5(0x82a, 'fr)d')](commands[_0x5235a5(0x8a5, 'v!iA')]())[_0x5235a5(0x938, ')Vmg')](',\x20'));
})());
const waitForCommands = async () => {
        const _0x15c1b9 = _0x3337, _0x482620 = {
                'FqBeg': function (_0x493f1a, _0x5a6993) {
                    return _0x493f1a && _0x5a6993;
                }
            };
        return _0x482620[_0x15c1b9(0x72c, 'Kh1Y')](!commandsLoaded, commandsLoadPromise) && await commandsLoadPromise, commands;
    }, getMessageText = _0x214204 => {
        const _0xe9a183 = _0x3337;
        if (!_0x214204)
            return '';
        if (_0x214204['conversati' + 'on'])
            return _0x214204[_0xe9a183(0xa0d, '!6eZ') + 'on'];
        if (_0x214204[_0xe9a183(0xa2c, 'jH^F') + _0xe9a183(0x57d, 'hKmO')]?.[_0xe9a183(0x9cc, '6#U$')])
            return _0x214204[_0xe9a183(0x537, 'Dzp9') + _0xe9a183(0x64b, 'W#(8')][_0xe9a183(0x568, 'v!iA')];
        if (_0x214204[_0xe9a183(0x7fe, 'Gz#P') + 'ge']?.[_0xe9a183(0xa03, 'VYw$')])
            return _0x214204[_0xe9a183(0x2ed, 'NOkJ') + 'ge'][_0xe9a183(0x8d6, 'NOkJ')];
        if (_0x214204[_0xe9a183(0x5d9, 'aUOA') + 'ge']?.[_0xe9a183(0xa9e, '!$R8')])
            return _0x214204[_0xe9a183(0x1e8, 'O@hb') + 'ge'][_0xe9a183(0xa48, 'W#(8')];
        return '';
    }, isMuted = (_0x37ea29, _0x34615c) => {
        const _0x5ea0f7 = _0x3337, _0x5dc81c = {
                'zIOVd': function (_0x8ebd1e, _0x18466a) {
                    return _0x8ebd1e > _0x18466a;
                },
                'TYIjZ': function (_0x35b004, _0x38a70a) {
                    return _0x35b004 !== _0x38a70a;
                },
                'wgKMB': _0x5ea0f7(0x62c, 'K%s%')
            }, _0x1b0dda = mutedUsers[_0x5ea0f7(0x6f7, 'NOkJ')](_0x37ea29);
        if (!_0x1b0dda)
            return ![];
        const _0x3f35ee = _0x1b0dda[_0x5ea0f7(0x961, 'Dzp9')](_0x34615c);
        if (!_0x3f35ee)
            return ![];
        if (_0x3f35ee['expires'] && _0x5dc81c[_0x5ea0f7(0x41f, 'XnfP')](Date[_0x5ea0f7(0x74f, ')Vmg')](), _0x3f35ee[_0x5ea0f7(0xa6c, 'rNL@')])) {
            _0x1b0dda[_0x5ea0f7(0x235, '[AjO')](_0x34615c);
            if (_0x1b0dda[_0x5ea0f7(0x25f, 'eo]Y')] === 0x0) {
                if (_0x5dc81c[_0x5ea0f7(0x571, 'y7P]')](_0x5dc81c[_0x5ea0f7(0x7c7, '%iYw')], _0x5ea0f7(0x8f4, 'eo]Y')))
                    mutedUsers[_0x5ea0f7(0x268, 'K%s%')](_0x37ea29);
                else
                    return _0x121a7f[_0x5ea0f7(0x20d, 'NOkJ') + 'e'](_0x34db07, { 'text': _0x4bb1f1['messages'][_0x5ea0f7(0x55a, 'v!iA')] }, { 'quoted': _0x2aa85a });
            }
            return ![];
        }
        return !![];
    }, getMessageContent = _0x51863b => {
        const _0x23733c = _0x3337;
        if (!_0x51863b || !_0x51863b[_0x23733c(0x6a2, 'B9Tk')])
            return null;
        let _0x395d0f = _0x51863b[_0x23733c(0x8cb, '%iYw')];
        if (_0x395d0f[_0x23733c(0x730, 'eo]Y') + _0x23733c(0x837, 'eo]Y')])
            _0x395d0f = _0x395d0f[_0x23733c(0x598, 'hKmO') + _0x23733c(0xa82, 'Dzp9')][_0x23733c(0x5ec, 'ZS%t')];
        if (_0x395d0f[_0x23733c(0x5ad, '[qEW') + _0x23733c(0x43d, 'Fpez')])
            _0x395d0f = _0x395d0f['viewOnceMe' + 'ssageV2'][_0x23733c(0x7ef, 'Z&DW')];
        if (_0x395d0f[_0x23733c(0x860, 'Kh1Y') + _0x23733c(0x349, 'Kh1Y')])
            _0x395d0f = _0x395d0f[_0x23733c(0x5ad, '[qEW') + 'ssage'][_0x23733c(0x323, 'eCWM')];
        if (_0x395d0f[_0x23733c(0x625, 'jH^F') + 'thCaptionM' + 'essage'])
            _0x395d0f = _0x395d0f[_0x23733c(0x70c, 'bI!F') + 'thCaptionM' + 'essage']['message'];
        return _0x395d0f;
    }, normalizeJid = _0x384046 => {
        const _0x2b767e = _0x3337, _0x1ecfbb = { 'OdpCB': _0x2b767e(0x4fa, 'bI!F') };
        if (!_0x384046)
            return null;
        if (typeof _0x384046 !== _0x1ecfbb[_0x2b767e(0xa25, '))Nx')])
            return null;
        let _0x1329f9 = _0x384046['split']('@')[0x0];
        return _0x1329f9 = _0x1329f9[_0x2b767e(0x392, '[AjO')](':')[0x0], _0x1329f9;
    }, isAdmin = async (_0x47a6a9, _0x257ad9, _0x4dcf1d, _0x4364ae = null) => {
        const _0x102fe6 = _0x3337, _0xf207a3 = {
                'SIAxD': function (_0x3dd194, _0x5e88a4) {
                    return _0x3dd194(_0x5e88a4);
                },
                'xYUSS': function (_0x1618ee, _0x5a2c28) {
                    return _0x1618ee === _0x5a2c28;
                },
                'erDEk': '@g.us',
                'lqLvb': function (_0x8f4fdf, _0xcbf6d6) {
                    return _0x8f4fdf !== _0xcbf6d6;
                },
                'lbpmg': _0x102fe6(0xa4e, 'Gz#P'),
                'FIAaK': function (_0x26a2c4, _0x56ce34) {
                    return _0x26a2c4 !== _0x56ce34;
                },
                'Kblvm': _0x102fe6(0x592, 'O@hb'),
                'HbSkS': _0x102fe6(0x91e, 'dxeI'),
                'wdqkS': function (_0x51b283, _0x4a531c) {
                    return _0x51b283 === _0x4a531c;
                },
                'qRvPz': _0x102fe6(0x9bf, 'pk&V'),
                'zwbqt': _0x102fe6(0x301, 'jH^F')
            };
        if (!_0x257ad9)
            return ![];
        if (!_0x4dcf1d || !_0x4dcf1d[_0x102fe6(0x889, '9M@a')](_0xf207a3[_0x102fe6(0x83d, 'eo]Y')]))
            return ![];
        let _0x3cf25f = _0x4364ae;
        if (!_0x3cf25f || !_0x3cf25f['participan' + 'ts']) {
            if (_0xf207a3['lqLvb'](_0xf207a3[_0x102fe6(0xa44, '3Ek4')], 'dZyPE'))
                try {
                    _0x3cf25f = await _0x47a6a9[_0x102fe6(0x8fb, 'O@hb') + _0x102fe6(0x839, 'y7P]')](_0x4dcf1d);
                } catch (_0x510221) {
                    return _0xf207a3[_0x102fe6(0x276, 'Pk!v')](_0xf207a3['Kblvm'], _0xf207a3['HbSkS']) ? ![] : ![];
                }
            else
                _0x32e38f = '[Media]', _0x56fab8 = _0x102fe6(0x8fd, 'hKmO') + 'ge';
        }
        if (!_0x3cf25f || !_0x3cf25f[_0x102fe6(0x2eb, 'Kh1Y') + 'ts'])
            return ![];
        const _0x9985c2 = normalizeJid(_0x257ad9), _0x35c370 = _0x3cf25f[_0x102fe6(0x7f6, 'VYw$') + 'ts'][_0x102fe6(0x66a, 'ZS%t')](_0x486189 => {
                const _0x35cacb = _0x102fe6, _0x9021fc = _0xf207a3[_0x35cacb(0x760, 'XzzT')](normalizeJid, _0x486189['id']);
                return _0xf207a3[_0x35cacb(0x5b6, 'B9Tk')](_0x9021fc, _0x9985c2);
            });
        return _0x35c370 && (_0xf207a3[_0x102fe6(0x57c, 'ZS%t')](_0x35c370[_0x102fe6(0x73c, '%iYw')], _0xf207a3[_0x102fe6(0xa4b, '[dUU')]) || _0xf207a3['xYUSS'](_0x35c370[_0x102fe6(0x81c, '[dUU')], _0xf207a3[_0x102fe6(0x863, '8*C0')]));
    }, isBotAdmin = async (_0x43cf06, _0x302c92, _0x45ba09 = null) => {
        const _0x158759 = _0x3337, _0x4eda8f = {
                'WTGTy': function (_0x35caa7, _0xae59c2) {
                    return _0x35caa7 === _0xae59c2;
                },
                'sRJbW': _0x158759(0x278, 'hKmO'),
                'sKcfn': _0x158759(0x9f4, 'dxeI'),
                'wjcmY': function (_0x5737c6, _0xcf3684) {
                    return _0x5737c6(_0xcf3684);
                },
                'Hduci': _0x158759(0x348, ')Vmg'),
                'jAwnA': _0x158759(0x2f5, 'IXWX') + _0x158759(0x920, 'Kh1Y'),
                'HVGtC': _0x158759(0x3fc, 'sOIM') + 'r',
                'dSNrI': _0x158759(0x2bc, 'Z&DW'),
                'NzOze': _0x158759(0x70f, 'bI!F'),
                'gmnJX': function (_0x2b0424, _0x37062a) {
                    return _0x2b0424(_0x37062a);
                },
                'lbQqj': function (_0x5b8171, _0xcff5a1) {
                    return _0x5b8171 === _0xcff5a1;
                },
                'rCHmZ': function (_0x162a89, _0x4c4230) {
                    return _0x162a89 === _0x4c4230;
                },
                'giwPV': 'superadmin',
                'YFzKd': _0x158759(0x850, 'eo]Y')
            };
        if (!_0x43cf06[_0x158759(0x2df, 'XnfP')] || !_0x302c92)
            return ![];
        if (!_0x302c92[_0x158759(0x259, 'ZS%t')](_0x4eda8f[_0x158759(0x973, 'jH^F')]))
            return ![];
        try {
            if (_0x4eda8f['WTGTy'](_0x4eda8f[_0x158759(0x8c7, 'eCWM')], _0x4eda8f['NzOze'])) {
                let _0x39934d = _0x45ba09;
                (!_0x39934d || !_0x39934d[_0x158759(0x34c, 'XzzT') + 'ts']) && (_0x39934d = await _0x43cf06[_0x158759(0x39a, '9M@a') + 'ata'](_0x302c92));
                if (!_0x39934d || !_0x39934d['participan' + 'ts'])
                    return ![];
                const _0x220898 = _0x4eda8f[_0x158759(0xa02, '!$R8')](normalizeJid, _0x43cf06[_0x158759(0x4f7, 'jH^F')]['id']), _0x1918de = _0x39934d[_0x158759(0x27c, 'Dzp9') + 'ts']['find'](_0x51c456 => {
                        const _0x2181cd = _0x158759;
                        if (_0x4eda8f[_0x2181cd(0x3a0, '[AjO')](_0x4eda8f[_0x2181cd(0x826, '))Nx')], _0x4eda8f[_0x2181cd(0x3b0, '[dUU')]))
                            _0x4a95f4 = _0x97469c[_0x2181cd(0x92d, 'XnfP') + 'ge']['caption'] || '';
                        else {
                            const _0x34e021 = _0x4eda8f[_0x2181cd(0x8b8, 'fr)d')](normalizeJid, _0x51c456['id']);
                            return _0x34e021 === _0x220898;
                        }
                    });
                return _0x1918de && (_0x4eda8f[_0x158759(0x6d8, 'IXWX')](_0x1918de[_0x158759(0x386, 'fr)d')], _0x158759(0x4f3, 'eCWM')) || _0x4eda8f[_0x158759(0x24e, 'dxeI')](_0x1918de[_0x158759(0xa04, '3Ek4')], _0x4eda8f[_0x158759(0xa4c, 'Z&DW')]));
            } else
                _0x318090 = _0x5cae14[_0x158759(0x28a, 'cl&d') + 'nc'](_0x9491d6);
        } catch (_0x201370) {
            if (_0x158759(0x282, 'eCWM') !== _0x4eda8f[_0x158759(0x6e3, 'VYw$')]) {
                if (!_0x28ecaa)
                    return !![];
                return _0x5a6855[_0x158759(0x65c, 'fr)d')](_0x4eda8f[_0x158759(0xa42, 'Kh1Y')]) || _0x53a1fe[_0x158759(0x8b0, 'Pk!v')](_0x4eda8f[_0x158759(0x2e0, '[qEW')]) || _0x1b7510['includes'](_0x4eda8f[_0x158759(0x4e1, 'IXWX')]);
            } else
                return ![];
        }
    }, isOwner = _0x1da9eb => {
        const _0x57d43e = _0x3337, _0x187486 = {
                'JeWZh': _0x57d43e(0x6ac, 'XzzT'),
                'KUhkl': function (_0x88b4cc, _0x2473d3) {
                    return _0x88b4cc === _0x2473d3;
                },
                'lbONp': function (_0x265c9f, _0x52ee5c) {
                    return _0x265c9f(_0x52ee5c);
                }
            };
        if (!_0x1da9eb)
            return ![];
        const _0x98a43b = _0x187486[_0x57d43e(0xa3a, 'Z&DW')](normalizeJid, _0x1da9eb);
        return _0x2523a0['ownerNumbe' + 'r'][_0x57d43e(0x780, '6#U$')](_0x254e90 => {
            const _0x84061f = _0x57d43e;
            if (_0x187486[_0x84061f(0x75a, '!$R8')] !== _0x84061f(0x73b, '3Ek4')) {
                const _0x4a74f7 = normalizeJid(_0x254e90[_0x84061f(0x494, 'Dzp9')]('@') ? _0x254e90 : _0x254e90 + ('@s.whatsap' + _0x84061f(0x925, 'pk&V')));
                return _0x187486['KUhkl'](_0x4a74f7, _0x98a43b);
            } else
                return _0x298932[_0x84061f(0x27a, 'ZS%t') + 'e'](_0x35153f, { 'text': _0x2e4d50[_0x84061f(0x565, 'y7P]')][_0x84061f(0x9ff, 'rNL@') + _0x84061f(0xa37, '@Ss8')] }, { 'quoted': _0x28a3c8 });
        });
    }, isMod = _0x4854ac => {
        const _0x45fb53 = _0x3337, _0x249f6f = {
                'NjZEn': function (_0x4bac2a, _0x31ff03) {
                    return _0x4bac2a(_0x31ff03);
                }
            }, _0x44e52b = _0x249f6f[_0x45fb53(0x990, 'hKmO')](normalizeJid, _0x4854ac);
        return _0x5ac19b[_0x45fb53(0x96a, 'bI!F') + 'r'](_0x44e52b);
    }, isSystemJid = _0x1af43b => {
        const _0xf7877c = _0x3337, _0x3f8750 = {
                'tnICy': _0xf7877c(0xa34, '%iYw') + _0xf7877c(0x4f2, 'cl&d'),
                'NnVoq': _0xf7877c(0xa9f, 'K%s%') + 'r'
            };
        if (!_0x1af43b)
            return !![];
        return _0x1af43b[_0xf7877c(0x6db, 'W#(8')](_0xf7877c(0x266, 'cl&d')) || _0x1af43b['includes'](_0x3f8750[_0xf7877c(0x242, 'Gz#P')]) || _0x1af43b['includes'](_0x3f8750['NnVoq']);
    }, cacheMessage = _0x5ceef6 => {
        const _0x4c9ca5 = _0x3337, _0x2ae147 = {
                'pDmSq': _0x4c9ca5(0x739, 'Gz#P') + _0x4c9ca5(0x2ea, 'bI!F'),
                'SgCEw': function (_0x3848a2, _0x33081a) {
                    return _0x3848a2(_0x33081a);
                },
                'kYJGF': function (_0x625ec1, _0x4ed55d) {
                    return _0x625ec1 === _0x4ed55d;
                },
                'aIGIu': _0x4c9ca5(0x620, 'eCWM') + _0x4c9ca5(0x4cb, ')Vmg') + ':',
                'lxFtm': function (_0x1ce47f, _0x13be3e) {
                    return _0x1ce47f !== _0x13be3e;
                },
                'xjoGy': _0x4c9ca5(0x7ad, 'bI!F'),
                'kUbqR': _0x4c9ca5(0x3bc, 'bI!F'),
                'CqbXg': _0x4c9ca5(0x541, 'v!iA') + 'on',
                'IBxTe': _0x4c9ca5(0x9f0, 'hKmO'),
                'uHsYF': _0x4c9ca5(0x546, 'VYw$'),
                'roLDy': _0x4c9ca5(0xa70, 'aUOA') + _0x4c9ca5(0x972, 'VbOS'),
                'JqtaP': _0x4c9ca5(0x362, 'W#(8'),
                'HlsRG': _0x4c9ca5(0x2ae, 'eo]Y') + 'ge',
                'TNKNj': _0x4c9ca5(0x90d, ')Vmg'),
                'JYCiQ': 'videoMessa' + 'ge',
                'Kewnp': _0x4c9ca5(0x55d, 'pk&V'),
                'XTyZV': _0x4c9ca5(0xa74, 'B9Tk') + _0x4c9ca5(0x765, 'y7P]'),
                'xspAY': _0x4c9ca5(0x6fb, 'ih4U'),
                'GXIgf': _0x4c9ca5(0x63c, 'VYw$') + _0x4c9ca5(0x8e8, 'O@hb'),
                'VuRNY': _0x4c9ca5(0x7f9, 'O@hb'),
                'hUTUf': _0x4c9ca5(0x43b, 'O@hb') + 'ge',
                'hZLyR': _0x4c9ca5(0x5bd, 'ih4U'),
                'DYaiy': _0x4c9ca5(0x563, 'VX^@'),
                'sbqYX': function (_0x176470, _0x118037) {
                    return _0x176470 > _0x118037;
                },
                'UKAVJ': function (_0x53b2cd, _0x2e31f6) {
                    return _0x53b2cd - _0x2e31f6;
                }
            };
        try {
            if (_0x2ae147[_0x4c9ca5(0x310, '(49)')](_0x2ae147[_0x4c9ca5(0x3ae, 'rNL@')], _0x2ae147[_0x4c9ca5(0x87e, 'O@hb')]))
                _0x312b00[_0x4c9ca5(0x76f, 'pk&V')](_0x4c9ca5(0x9fc, '6#U$') + _0x4c9ca5(0x6d7, 'Gz#P') + _0x4c9ca5(0x5c8, 'IXWX') + _0x1eeedf + ':', _0x789215[_0x4c9ca5(0xa52, 'pk&V')]);
            else {
                if (!_0x5ceef6[_0x4c9ca5(0x2d1, '))Nx')]?.['id'])
                    return;
                if (_0x5ceef6[_0x4c9ca5(0x952, 'y7P]')]['fromMe'])
                    return;
                const _0x2a380f = _0x5ceef6[_0x4c9ca5(0x319, 'rNL@')]['remoteJid'];
                let _0x5570f7 = '', _0x2dee43 = 'unknown';
                const _0x41371c = getMessageContent(_0x5ceef6);
                if (_0x41371c) {
                    if (_0x41371c['conversati' + 'on'])
                        _0x2ae147[_0x4c9ca5(0x2f1, 'sOIM')] === _0x4c9ca5(0x6e9, 'B9Tk') ? (_0x5570f7 = _0x41371c[_0x4c9ca5(0x5ab, 'bI!F') + 'on'], _0x2dee43 = _0x2ae147[_0x4c9ca5(0x5aa, 'Pk!v')]) : _0x3cd52b[_0x4c9ca5(0x6a7, '[qEW')](_0x2ae147[_0x4c9ca5(0x707, '@Ss8')], _0x103c97);
                    else {
                        if (_0x41371c[_0x4c9ca5(0x49f, 'hKmO') + _0x4c9ca5(0x886, 'Pk!v')]?.[_0x4c9ca5(0x58e, 'hKmO')]) {
                            if (_0x2ae147['IBxTe'] !== _0x2ae147['uHsYF'])
                                _0x5570f7 = _0x41371c[_0x4c9ca5(0x653, '6#U$') + _0x4c9ca5(0x9ed, 'qyfM')][_0x4c9ca5(0x6f3, '%iYw')], _0x2dee43 = _0x2ae147['roLDy'];
                            else {
                                const _0x3851fa = DosrII[_0x4c9ca5(0x7d5, 'XzzT')](_0x2121de, _0x4fa472['id']);
                                return DosrII[_0x4c9ca5(0x90a, 'aUOA')](_0x3851fa, _0x29874f);
                            }
                        } else {
                            if (_0x41371c[_0x4c9ca5(0x9a9, 'VX^@') + 'ge'])
                                _0x5570f7 = _0x41371c[_0x4c9ca5(0x7fe, 'Gz#P') + 'ge'][_0x4c9ca5(0x3a5, 'Yhq6')] || _0x2ae147[_0x4c9ca5(0x2c8, 'ZS%t')], _0x2dee43 = _0x2ae147[_0x4c9ca5(0x56c, '!$R8')];
                            else {
                                if (_0x41371c[_0x4c9ca5(0x455, 'qyfM') + 'ge'])
                                    _0x5570f7 = _0x41371c[_0x4c9ca5(0x38e, '[dUU') + 'ge'][_0x4c9ca5(0x3db, 'jH^F')] || _0x2ae147['TNKNj'], _0x2dee43 = _0x2ae147['JYCiQ'];
                                else {
                                    if (_0x41371c[_0x4c9ca5(0x7aa, 'Yhq6') + _0x4c9ca5(0xa26, 'rNL@')])
                                        _0x5570f7 = _0x2ae147[_0x4c9ca5(0x535, 'eo]Y')], _0x2dee43 = _0x2ae147[_0x4c9ca5(0x2a4, 'K%s%')];
                                    else {
                                        if (_0x41371c[_0x4c9ca5(0x437, 'W#(8') + 'ge'])
                                            _0x2ae147[_0x4c9ca5(0x46f, 'K%s%')](_0x2ae147[_0x4c9ca5(0x34b, 'aUOA')], _0x2ae147['xspAY']) ? (_0x5570f7 = _0x4c9ca5(0x263, ')Vmg'), _0x2dee43 = _0x4c9ca5(0x706, '!$R8') + 'ge') : _0x3d974['error'](_0x2ae147[_0x4c9ca5(0x75e, 'O@hb')], _0x4d74c2);
                                        else {
                                            if (_0x41371c[_0x4c9ca5(0x7ae, 'Dzp9') + _0x4c9ca5(0x1eb, '[dUU')])
                                                _0x5570f7 = _0x4c9ca5(0x4b8, '@Ss8') + '\x20' + (_0x41371c['documentMe' + 'ssage'][_0x4c9ca5(0x8dc, 'y7P]')] || _0x4c9ca5(0x9af, 'Dzp9')), _0x2dee43 = _0x2ae147['GXIgf'];
                                            else
                                                _0x41371c[_0x4c9ca5(0xa07, '9M@a') + _0x4c9ca5(0x7b1, 'VX^@') + 'ge'] ? (_0x5570f7 = '[Button\x20Re' + 'sponse:\x20' + _0x41371c[_0x4c9ca5(0x2fe, '[qEW') + _0x4c9ca5(0x5c4, '[qEW') + 'ge'][_0x4c9ca5(0x7de, '))Nx') + _0x4c9ca5(0x63e, 'W#(8')] + ']', _0x2dee43 = 'buttonsRes' + 'ponseMessa' + 'ge') : (_0x5570f7 = _0x2ae147[_0x4c9ca5(0x3c8, ')Vmg')], _0x2dee43 = _0x2ae147[_0x4c9ca5(0x842, '8*C0')]);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                if (_0x5570f7) {
                    if (_0x2ae147[_0x4c9ca5(0x605, 'jH^F')](_0x2ae147[_0x4c9ca5(0x88a, '8*C0')], _0x2ae147[_0x4c9ca5(0x2ff, '!$R8')])) {
                        const _0x2a692a = _0x5ceef6['key'][_0x4c9ca5(0x3be, '[qEW') + 't'] || _0x5ceef6[_0x4c9ca5(0x969, 'O@hb')][_0x4c9ca5(0xa23, 'sOIM')];
                        messageCache[_0x4c9ca5(0x798, '!6eZ')](_0x5ceef6[_0x4c9ca5(0x8b9, 'v!iA')]['id'], {
                            'sender': _0x2a692a,
                            'content': _0x5570f7[_0x4c9ca5(0x338, 'aUOA')](0x0, 0x1f4),
                            'timestamp': Date[_0x4c9ca5(0x2a6, 'Fpez')](),
                            'messageType': _0x2dee43
                        });
                        const _0x5568bc = Date[_0x4c9ca5(0x297, 'rNL@')]();
                        for (const [_0x1076fe, _0x16c883] of messageCache['entries']()) {
                            _0x2ae147[_0x4c9ca5(0x3ee, 'Z&DW')](_0x2ae147['DYaiy'], _0x2ae147[_0x4c9ca5(0x82d, 'hKmO')]) ? _0xc2219b = _0x4cfdcf[_0x4c9ca5(0x4bf, '[qEW') + 'on'] : _0x2ae147['sbqYX'](_0x2ae147['UKAVJ'](_0x5568bc, _0x16c883[_0x4c9ca5(0x906, 'W#(8')]), MESSAGE_CACHE_TTL) && messageCache[_0x4c9ca5(0x433, 'O@hb')](_0x1076fe);
                        }
                    } else
                        _0x35c769[_0x4c9ca5(0x684, '8*C0')](_0x4f5908) && (_0x18010d = _0x5db302['readFileSy' + 'nc'](_0x1740da));
                }
            }
        } catch (_0x514c2a) {
        }
    }, handleMessageDelete = async (_0x1a3199, _0x40ce9a) => {
        const _0x3a6ad6 = _0x3337, _0x154d15 = {
                'lRXqT': function (_0x55628b, _0x3c897c, _0x280bdc) {
                    return _0x55628b(_0x3c897c, _0x280bdc);
                },
                'qyVSW': _0x3a6ad6(0x3ec, 'Fpez') + '4',
                'ICsLk': function (_0x45564e, _0x240d6e) {
                    return _0x45564e !== _0x240d6e;
                },
                'yMSfk': _0x3a6ad6(0x239, '@Ss8'),
                'zyTpn': _0x3a6ad6(0x789, '(49)'),
                'XCbcl': _0x3a6ad6(0x5a7, 'fr)d') + 'ＡＴ',
                'RgxJe': function (_0x1d8d88, _0x550424) {
                    return _0x1d8d88 === _0x550424;
                },
                'TZSpa': _0x3a6ad6(0x293, '[AjO'),
                'WgjVO': 'TCoyn',
                'EdeyC': 'YDUiP',
                'wSiPj': _0x3a6ad6(0x6e6, 'ZS%t'),
                'CoYvZ': _0x3a6ad6(0x425, 'XzzT'),
                'eoYrJ': _0x3a6ad6(0x746, '@Ss8') + 'ge',
                'ICUjO': _0x3a6ad6(0x706, '!$R8') + 'ge',
                'pKvvq': _0x3a6ad6(0x33f, 'qyfM') + _0x3a6ad6(0x991, 'v!iA'),
                'rqCnp': function (_0x446858, _0xd308fa) {
                    return _0x446858 + _0xd308fa;
                },
                'fZayp': function (_0x4f23b6, _0x2b7898) {
                    return _0x4f23b6 + _0x2b7898;
                },
                'MZTZF': function (_0xd3fd70, _0x56e8e8) {
                    return _0xd3fd70 + _0x56e8e8;
                },
                'odjBQ': function (_0x573fae, _0x27b390) {
                    return _0x573fae + _0x27b390;
                },
                'bJhTR': function (_0x581099, _0x31d3a4) {
                    return _0x581099 + _0x31d3a4;
                },
                'IkCoj': _0x3a6ad6(0x434, 'XzzT'),
                'LKbht': function (_0x5b210f, _0xad50e0) {
                    return _0x5b210f + _0xad50e0;
                },
                'XtjzA': function (_0x425e96, _0x456f41) {
                    return _0x425e96 + _0x456f41;
                },
                'jwydd': function (_0x12bc75, _0x528378) {
                    return _0x12bc75 + _0x528378;
                },
                'vvirU': _0x3a6ad6(0x7f4, 'Pk!v'),
                'hIeId': _0x3a6ad6(0x60a, '3Ek4'),
                'QTGKS': _0x3a6ad6(0x7e8, '))Nx'),
                'RdAKG': 'oEDhA',
                'KCGvO': _0x3a6ad6(0x82e, 'hKmO'),
                'PWycj': _0x3a6ad6(0x65a, 'B9Tk') + _0x3a6ad6(0x919, '!6eZ') + _0x3a6ad6(0xa31, '!6eZ')
            };
        try {
            if (_0x154d15[_0x3a6ad6(0x5f4, 'y7P]')](_0x154d15[_0x3a6ad6(0x960, 'jH^F')], _0x154d15[_0x3a6ad6(0x51a, '%iYw')]))
                _0x5397e8[_0x3a6ad6(0x768, 'bI!F')]('Failed\x20to\x20' + 'delete\x20ant' + _0x3a6ad6(0x766, '9M@a') + 'ge:', _0x2bf957);
            else {
                const _0x2cf5c0 = _0x40ce9a[_0x3a6ad6(0x9e1, '%iYw')];
                if (!_0x2cf5c0 || !_0x2cf5c0[_0x3a6ad6(0x51d, 'aUOA')])
                    return;
                for (const _0x55472e of _0x2cf5c0) {
                    if (_0x55472e[_0x3a6ad6(0x328, ')Vmg')]?.[_0x3a6ad6(0xa66, 'Dzp9')])
                        continue;
                    const _0x1968e5 = _0x55472e[_0x3a6ad6(0x821, 'Fpez')][_0x3a6ad6(0x345, 'IXWX')];
                    let _0x59ca85 = _0x1968e5[_0x3a6ad6(0x2f7, 'VYw$')](_0x3a6ad6(0x802, 'eo]Y')) ? _0x154d15[_0x3a6ad6(0x1f2, 'VbOS')] : _0x154d15[_0x3a6ad6(0x899, 'VbOS')], _0x5ccf1d = ![];
                    if (_0x1968e5[_0x3a6ad6(0x59a, 'eo]Y')](_0x3a6ad6(0x3e2, 'sOIM'))) {
                        if (_0x154d15[_0x3a6ad6(0x505, '%iYw')](_0x154d15[_0x3a6ad6(0x5f8, 'K%s%')], _0x154d15[_0x3a6ad6(0x32e, 'fr)d')]))
                            _0x154d15[_0x3a6ad6(0x49a, 'ZS%t')](_0x44598b, _0x4505c9, _0x4b2a21);
                        else {
                            const _0x27ef86 = _0x5ac19b['getGroupSe' + _0x3a6ad6(0x5bc, 'VX^@')](_0x1968e5);
                            _0x5ccf1d = _0x27ef86[_0x3a6ad6(0x8ba, '%iYw')] || ![];
                        }
                    } else {
                        if (_0x154d15[_0x3a6ad6(0x577, 'aUOA')](_0x154d15[_0x3a6ad6(0x47e, 'Dzp9')], _0x3a6ad6(0x485, 'v!iA'))) {
                            const _0x50bcf9 = _0x5ac19b[_0x3a6ad6(0x6f6, '[qEW') + 'Settings'](_0x1968e5);
                            _0x5ccf1d = _0x50bcf9[_0x3a6ad6(0x32a, '[dUU')] || ![];
                        } else
                            return _0xf6ac21['sendMessag' + 'e'](_0xe22078, { 'text': _0x5b1a62['messages'][_0x3a6ad6(0x4a9, 'B9Tk')] }, { 'quoted': _0x45fb30 });
                    }
                    if (!_0x5ccf1d)
                        continue;
                    const _0x4dba0b = _0x55472e[_0x3a6ad6(0x2d1, '))Nx')]['id'], _0x1515eb = messageCache[_0x3a6ad6(0x5ea, 'Z&DW')](_0x4dba0b);
                    if (_0x1515eb) {
                        const _0x2e8d19 = _0x55472e[_0x3a6ad6(0x403, 'eo]Y') + 't'] || _0x55472e[_0x3a6ad6(0x328, ')Vmg')][_0x3a6ad6(0x27c, 'Dzp9') + 't'] || _0x1968e5, _0x359c08 = _0x1515eb[_0x3a6ad6(0xab0, '[AjO')], _0xa939e0 = _0x1515eb[_0x3a6ad6(0x5cf, 'aUOA')], _0x366ffc = _0x1515eb[_0x3a6ad6(0x6ed, ')Vmg')], _0x541abc = _0x1515eb[_0x3a6ad6(0x3de, '%iYw') + 'e'] || _0x154d15[_0x3a6ad6(0x58f, '!$R8')];
                        let _0x45091e = _0x359c08[_0x3a6ad6(0x750, ')Vmg')]('@')[0x0], _0x29c911 = _0x2e8d19[_0x3a6ad6(0x414, '!$R8')]('@')[0x0], _0x3333d4 = '📝';
                        if (_0x154d15[_0x3a6ad6(0x85e, '9M@a')](_0x541abc, _0x3a6ad6(0x383, 'jH^F') + 'ge'))
                            _0x3333d4 = _0x154d15['CoYvZ'];
                        else {
                            if (_0x541abc === _0x154d15[_0x3a6ad6(0x258, 'Pk!v')])
                                _0x3333d4 = '🎥';
                            else {
                                if (_0x154d15[_0x3a6ad6(0x5b1, 'jH^F')](_0x541abc, _0x3a6ad6(0xa74, 'B9Tk') + _0x3a6ad6(0x52b, 'eo]Y')))
                                    _0x3333d4 = '🏷️';
                                else {
                                    if (_0x154d15[_0x3a6ad6(0x4d9, 'NOkJ')](_0x541abc, _0x154d15[_0x3a6ad6(0x3bd, '@Ss8')]))
                                        _0x3333d4 = '🎵';
                                    else {
                                        if (_0x541abc === _0x154d15[_0x3a6ad6(0x6f0, '[qEW')])
                                            _0x3333d4 = '📄';
                                    }
                                }
                            }
                        }
                        const _0x2080bd = _0x154d15[_0x3a6ad6(0x2f6, '6#U$')](_0x154d15[_0x3a6ad6(0x8d7, 'VX^@')](_0x154d15['MZTZF'](_0x154d15[_0x3a6ad6(0x855, 'Z&DW')](_0x154d15[_0x3a6ad6(0x5e9, 'cl&d')](_0x154d15[_0x3a6ad6(0x627, 'Pk!v')](_0x154d15[_0x3a6ad6(0x4fc, ')Vmg')](_0x154d15[_0x3a6ad6(0x769, 'bI!F')](_0x154d15['bJhTR'](_0x154d15[_0x3a6ad6(0x457, 'dxeI')](_0x154d15[_0x3a6ad6(0x974, 'qyfM')](_0x3a6ad6(0x2cc, '%iYw') + '\x20ＤＥＬＥＴＥＤ*\x20' + _0x3a6ad6(0x8d5, 'cl&d'), _0x3a6ad6(0x8f3, 'VbOS') + _0x3a6ad6(0x6c5, 'IXWX')), '┃\x0a'), _0x3a6ad6(0x401, 'dxeI') + _0x3a6ad6(0x6d1, '@Ss8') + _0x59ca85 + '\x0a') + ('┃\x20' + _0x3333d4 + _0x3a6ad6(0x1ea, 'Kh1Y') + _0x541abc[_0x3a6ad6(0x6c1, '%iYw')](_0x154d15['IkCoj'], '') + '\x0a'), _0x3a6ad6(0xaa5, 'Fpez') + _0x3a6ad6(0x2c3, 'Kh1Y') + _0x45091e + '\x0a'), '┃\x20🗑️\x20*Delet' + _0x3a6ad6(0x336, 'jobK') + _0x29c911 + '\x0a'), '┃\x20📝\x20*Messa' + _0x3a6ad6(0x603, 'XzzT')), '┃\x20' + _0xa939e0 + '\x0a'), '┃\x0a'), _0x3a6ad6(0x5d4, '%iYw') + '*\x20' + new Date(_0x366ffc)['toLocaleSt' + _0x3a6ad6(0x775, 'Yhq6')]() + '\x0a'), '┃\x0a'), _0x3a6ad6(0x540, 'Kh1Y') + '━━━━━━━━━━' + _0x3a6ad6(0x2a0, 'Dzp9')) + ('⚡\x20ᴘᴏᴡᴇʀᴇᴅ\x20' + _0x3a6ad6(0x28f, '[dUU') + '\x20⚡');
                        await _0x1a3199[_0x3a6ad6(0x2dc, 'pk&V') + 'e'](_0x1968e5, {
                            'text': _0x2080bd,
                            'mentions': [
                                _0x359c08,
                                _0x2e8d19
                            ]
                        });
                        const _0x4d7537 = _0x154d15[_0x3a6ad6(0x501, 'cl&d')](_0x154d15[_0x3a6ad6(0x40e, 'qyfM')](_0x154d15[_0x3a6ad6(0x378, '%iYw')](_0x154d15[_0x3a6ad6(0xa18, 'Z&DW')](_0x154d15[_0x3a6ad6(0x316, '[qEW')](_0x154d15['MZTZF'](_0x154d15[_0x3a6ad6(0x417, 'K%s%')](_0x154d15[_0x3a6ad6(0x44f, 'K%s%')](_0x154d15[_0x3a6ad6(0x86d, 'W#(8')](_0x154d15[_0x3a6ad6(0x799, 'eo]Y')](_0x154d15[_0x3a6ad6(0x743, 'O@hb')](_0x3a6ad6(0x756, 'fr)d') + '\x20ＭＥＳＳＡＧＥ\x20Ｒ' + _0x3a6ad6(0x7f1, 'O@hb'), _0x3a6ad6(0x8f3, 'VbOS') + _0x3a6ad6(0x9a6, 'bI!F')) + '┃\x0a', _0x3a6ad6(0x735, 'VYw$') + '*\x20' + _0x1968e5 + '\x0a'), '┃\x20📍\x20*Chat\x20' + _0x3a6ad6(0xa72, 'XzzT') + _0x1968e5[_0x3a6ad6(0x940, '6#U$')]('@')[0x0] + '\x0a'), '┃\x20📍\x20*Type:' + '*\x20' + _0x59ca85 + '\x0a'), '┃\x0a'), '┃\x20' + _0x3333d4 + _0x3a6ad6(0x228, '[qEW') + _0x541abc[_0x3a6ad6(0x32b, 'rNL@')](_0x154d15[_0x3a6ad6(0x611, ')Vmg')], '') + '\x0a') + (_0x3a6ad6(0xaa5, 'Fpez') + _0x3a6ad6(0xa83, 'Dzp9') + _0x45091e + '\x0a') + (_0x3a6ad6(0x7af, 'VYw$') + _0x3a6ad6(0x78d, 'dxeI') + _0x29c911 + '\x0a'), _0x3a6ad6(0x354, 'qyfM') + _0x3a6ad6(0x4a4, 'Yhq6')) + ('┃\x20' + _0xa939e0 + '\x0a'), '┃\x0a') + (_0x3a6ad6(0x8e4, 'VX^@') + '*\x20' + new Date(_0x366ffc)[_0x3a6ad6(0x47a, 'VX^@') + _0x3a6ad6(0x2d8, 'sOIM')]() + '\x0a'), '┃\x0a'), _0x3a6ad6(0x650, '[dUU') + _0x3a6ad6(0x26d, 'Yhq6') + '━━╯\x0a\x0a'), _0x3a6ad6(0x272, '9M@a') + _0x3a6ad6(0x8b4, 'eo]Y') + '\x20⚡');
                        for (const _0xcabfb6 of _0x2523a0[_0x3a6ad6(0x797, '[qEW') + 'r']) {
                            const _0x2b19c9 = _0xcabfb6[_0x3a6ad6(0x5b2, '@Ss8')]('@') ? _0xcabfb6 : _0xcabfb6 + (_0x3a6ad6(0x76e, 'Fpez') + _0x3a6ad6(0x586, 'v!iA'));
                            try {
                                _0x154d15['vvirU'] !== _0x3a6ad6(0x609, '@Ss8') ? _0x54765b = !![] : await _0x1a3199[_0x3a6ad6(0x6bf, 'Dzp9') + 'e'](_0x2b19c9, {
                                    'text': _0x4d7537,
                                    'mentions': [
                                        _0x359c08,
                                        _0x2e8d19
                                    ]
                                });
                            } catch (_0xab1ea9) {
                                if (_0x154d15['hIeId'] !== _0x154d15[_0x3a6ad6(0x6c4, '!6eZ')])
                                    console[_0x3a6ad6(0x866, 'aUOA')](_0x3a6ad6(0x5d6, 'K%s%') + _0x3a6ad6(0x459, '8*C0') + _0x3a6ad6(0x3f0, '%iYw') + _0xcabfb6 + ':', _0xab1ea9[_0x3a6ad6(0x710, ')Vmg')]);
                                else {
                                    const _0x57b79e = _0x5e82be[_0x3a6ad6(0x909, '!$R8') + _0x3a6ad6(0x712, 'O@hb')](_0x30e13b);
                                    _0x51bf41 = _0x57b79e['antidelete'] || ![];
                                }
                            }
                        }
                        messageCache[_0x3a6ad6(0x804, 'VX^@')](_0x4dba0b);
                    }
                }
            }
        } catch (_0x36016c) {
            if (_0x154d15[_0x3a6ad6(0x4e9, 'sOIM')](_0x154d15[_0x3a6ad6(0x8ae, 'sOIM')], _0x154d15['KCGvO'])) {
                const _0xf6d714 = _0x154d15[_0x3a6ad6(0x7f3, 'y7P]')][_0x3a6ad6(0x945, 'ih4U')]('|');
                let _0xf14330 = 0x0;
                while (!![]) {
                    switch (_0xf6d714[_0xf14330++]) {
                    case '0':
                        if (_0x59a658['conversati' + 'on'])
                            return _0x38fcde[_0x3a6ad6(0x94b, '(49)') + 'on'];
                        continue;
                    case '1':
                        if (_0x2633d0[_0x3a6ad6(0x6e8, 'dxeI') + 'ge']?.['caption'])
                            return _0x30b9ab[_0x3a6ad6(0x553, 'aUOA') + 'ge'][_0x3a6ad6(0x3a5, 'Yhq6')];
                        continue;
                    case '2':
                        if (_0x22f36c[_0x3a6ad6(0xa20, '))Nx') + _0x3a6ad6(0x68a, 'aUOA')]?.[_0x3a6ad6(0x8be, 'XzzT')])
                            return _0xa4bc66[_0x3a6ad6(0x2f4, 'eo]Y') + _0x3a6ad6(0x8cf, '[qEW')][_0x3a6ad6(0x4f8, 'Gz#P')];
                        continue;
                    case '3':
                        if (_0x41e225['videoMessa' + 'ge']?.[_0x3a6ad6(0x85b, '9M@a')])
                            return _0x4e4908[_0x3a6ad6(0xa6e, 'jobK') + 'ge']['caption'];
                        continue;
                    case '4':
                        return '';
                    case '5':
                        if (!_0x17749a)
                            return '';
                        continue;
                    }
                    break;
                }
            } else
                console[_0x3a6ad6(0x6a7, '[qEW')](_0x154d15[_0x3a6ad6(0x4b5, 'fr)d')], _0x36016c);
        }
    }, handleAntilink = async (_0x5cdf47, _0x276284, _0x4dd959) => {
        const _0x1d92e7 = _0x3337, _0xf03fa2 = {
                'oEWkg': _0x1d92e7(0x812, 'cl&d'),
                'VPQyu': _0x1d92e7(0x7a0, 'Yhq6') + 'ge',
                'cPnkI': function (_0x177c89, _0x328f84, _0x3b0db4, _0x430f7c, _0x445c02) {
                    return _0x177c89(_0x328f84, _0x3b0db4, _0x430f7c, _0x445c02);
                },
                'bjLze': function (_0x15d267, _0x1a347d) {
                    return _0x15d267(_0x1a347d);
                },
                'LVyOv': function (_0x251ff4, _0x1b4764) {
                    return _0x251ff4 || _0x1b4764;
                },
                'uRIPT': function (_0x599b0e, _0x1eadde, _0x3433a7, _0x4ea552) {
                    return _0x599b0e(_0x1eadde, _0x3433a7, _0x4ea552);
                },
                'nGXdQ': _0x1d92e7(0xab2, '@Ss8'),
                'SLFtf': function (_0x309007, _0x21c178) {
                    return _0x309007 === _0x21c178;
                },
                'oywvc': 'kick',
                'Nkjim': 'remove'
            };
        try {
            const _0x1789ca = _0x276284[_0x1d92e7(0x8b9, 'v!iA')][_0x1d92e7(0x9e9, '!$R8')], _0x2712e7 = _0x276284[_0x1d92e7(0x319, 'rNL@')]['participan' + 't'] || _0x276284['key']['remoteJid'], _0x33ac65 = _0x5ac19b[_0x1d92e7(0x6ae, '6#U$') + _0x1d92e7(0x96e, 'VbOS')](_0x1789ca);
            if (!_0x33ac65[_0x1d92e7(0xaab, 'O@hb')])
                return;
            const _0x48bb2b = _0x276284[_0x1d92e7(0x71d, 'Kh1Y')]?.[_0x1d92e7(0x6fe, 'B9Tk') + 'on'] || _0x276284['message']?.['extendedTe' + _0x1d92e7(0x69a, '6#U$')]?.[_0x1d92e7(0x64f, '[AjO')] || _0x276284[_0x1d92e7(0x512, '3Ek4')]?.[_0x1d92e7(0x898, 'y7P]') + 'ge']?.['caption'] || _0x276284[_0x1d92e7(0x3d5, 'K%s%')]?.[_0x1d92e7(0x664, 'sOIM') + 'ge']?.[_0x1d92e7(0x484, 'eo]Y')] || '', _0x250aeb = /chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i;
            if (_0x250aeb[_0x1d92e7(0x97e, 'ZS%t')](_0x48bb2b)) {
                if (_0x1d92e7(0x54d, '(49)') !== _0x1d92e7(0x54a, 'XnfP'))
                    _0x17967f = _0x3685d0['imageMessa' + 'ge'][_0x1d92e7(0x264, '[AjO')] || bRvkeH[_0x1d92e7(0x233, 'B9Tk')], _0x4e5394 = bRvkeH['VPQyu'];
                else {
                    const _0x490e9e = await _0xf03fa2[_0x1d92e7(0x7be, 'XzzT')](isAdmin, _0x5cdf47, _0x2712e7, _0x1789ca, _0x4dd959), _0x226514 = _0xf03fa2[_0x1d92e7(0x98f, 'NOkJ')](isOwner, _0x2712e7);
                    if (_0xf03fa2[_0x1d92e7(0x676, '6#U$')](_0x490e9e, _0x226514))
                        return;
                    const _0x33a1a3 = await _0xf03fa2['uRIPT'](isBotAdmin, _0x5cdf47, _0x1789ca, _0x4dd959), _0x209ce5 = (_0x33ac65[_0x1d92e7(0x458, 'B9Tk') + _0x1d92e7(0x420, 'Fpez')] || _0xf03fa2[_0x1d92e7(0x313, 'Kh1Y')])[_0x1d92e7(0x53e, '[dUU') + 'e']();
                    if (_0xf03fa2['SLFtf'](_0x209ce5, _0xf03fa2['oywvc']) && _0x33a1a3)
                        try {
                            await _0x5cdf47[_0x1d92e7(0x207, '!$R8') + 'e'](_0x1789ca, { 'delete': _0x276284[_0x1d92e7(0x43f, 'Z&DW')] }), await _0x5cdf47[_0x1d92e7(0x5ca, '8*C0') + _0x1d92e7(0x9b1, '[AjO') + _0x1d92e7(0xa8f, '[qEW')](_0x1789ca, [_0x2712e7], _0xf03fa2[_0x1d92e7(0x8d8, 'Pk!v')]);
                        } catch (_0xc32c1b) {
                            console[_0x1d92e7(0x387, 'ih4U')](_0x1d92e7(0x1ee, 'W#(8') + _0x1d92e7(0x50a, 'ih4U'), _0xc32c1b);
                        }
                    else
                        try {
                            await _0x5cdf47['sendMessag' + 'e'](_0x1789ca, { 'delete': _0x276284[_0x1d92e7(0x4f0, 'Yhq6')] });
                        } catch (_0x59cec5) {
                            console[_0x1d92e7(0x903, '%iYw')]('Failed\x20to\x20' + _0x1d92e7(0x6ca, 'ih4U'), _0x59cec5);
                        }
                }
            }
        } catch (_0xcb913) {
            console[_0x1d92e7(0x6e1, 'hKmO')]('Error\x20in\x20a' + _0x1d92e7(0x374, 'rNL@'), _0xcb913);
        }
    }, handleAntitag = async (_0x16e4c7, _0x1b41b7, _0x270460) => {
        const _0x30c515 = _0x3337, _0x3b7c7c = {
                'mclqX': function (_0x166bba, _0x4ab2e8) {
                    return _0x166bba > _0x4ab2e8;
                },
                'STMdp': function (_0xaf8612, _0x1cf804) {
                    return _0xaf8612 === _0x1cf804;
                },
                'xkXdL': _0x30c515(0xa87, 'aUOA') + _0x30c515(0x7ab, '!6eZ'),
                'wCYIq': _0x30c515(0x6d3, '8*C0') + 'istributio' + _0x30c515(0x711, 'VbOS'),
                'ILywh': function (_0x1519a5, _0x585f35) {
                    return _0x1519a5(_0x585f35);
                },
                'mpipr': function (_0x34f2a3, _0x53b531) {
                    return _0x34f2a3 === _0x53b531;
                },
                'Ukdny': function (_0x220f75, _0x58ab8c) {
                    return _0x220f75 !== _0x58ab8c;
                },
                'heCHZ': _0x30c515(0x606, 'ih4U'),
                'FieFT': function (_0x2fb720, _0xc6796c) {
                    return _0x2fb720(_0xc6796c);
                },
                'HEmrf': function (_0x2b3a62, _0x5e0c5e) {
                    return _0x2b3a62 !== _0x5e0c5e;
                },
                'uqqAd': 'JQgPb',
                'apUdH': function (_0x5cdd9c, _0x10fe3d, _0x2e1763, _0x45a9cb, _0x1f72dc) {
                    return _0x5cdd9c(_0x10fe3d, _0x2e1763, _0x45a9cb, _0x1f72dc);
                },
                'YMZTz': _0x30c515(0xa2a, 'jH^F'),
                'VCIlL': _0x30c515(0x5dc, '!$R8'),
                'MJSDf': _0x30c515(0x3f1, '!6eZ'),
                'AkfGb': _0x30c515(0x901, 'XnfP'),
                'Dgafl': _0x30c515(0x699, '6#U$'),
                'ImBrL': _0x30c515(0x702, 'IXWX') + _0x30c515(0xa86, 'pk&V') + _0x30c515(0x782, 'pk&V'),
                'magdF': _0x30c515(0xa1a, '!$R8'),
                'OqfCG': function (_0x56a8c7, _0x491674) {
                    return _0x56a8c7 !== _0x491674;
                },
                'eVasH': _0x30c515(0x215, 'VbOS'),
                'iQLwx': function (_0x4c9cde, _0x4060e1) {
                    return _0x4c9cde !== _0x4060e1;
                },
                'EsXvR': 'UHkVt',
                'ojoSf': _0x30c515(0x2b3, 'B9Tk') + _0x30c515(0x8a1, 'B9Tk') + _0x30c515(0x6c0, 'cl&d') + _0x30c515(0x3ba, 'XzzT'),
                'BIsXU': _0x30c515(0x60b, 'ZS%t'),
                'lUxQu': _0x30c515(0x525, 'B9Tk') + _0x30c515(0x432, 'ZS%t')
            };
        try {
            if (_0x3b7c7c[_0x30c515(0x4d0, '6#U$')](_0x3b7c7c['heCHZ'], _0x30c515(0xa8d, 'VYw$'))) {
                const _0x2a7e3a = _0x5c0816[_0x30c515(0x3ef, '!$R8')](_0x5c5adc);
                if (!_0x2a7e3a)
                    return ![];
                const _0x92ab4e = _0x2a7e3a[_0x30c515(0x346, 'W#(8')](_0x345fdc);
                if (!_0x92ab4e)
                    return ![];
                if (_0x92ab4e[_0x30c515(0x854, '[AjO')] && TNDAWp[_0x30c515(0x2f9, 'Pk!v')](_0x52df30['now'](), _0x92ab4e[_0x30c515(0x9eb, 'IXWX')]))
                    return _0x2a7e3a[_0x30c515(0x8a3, '[qEW')](_0x55a3f2), TNDAWp[_0x30c515(0x5a4, 'ih4U')](_0x2a7e3a['size'], 0x0) && _0x223357[_0x30c515(0x8d0, '%iYw')](_0x3d55ec), ![];
                return !![];
            } else {
                const _0x17ea66 = _0x1b41b7['key'][_0x30c515(0x2af, 'NOkJ')], _0x30f828 = _0x1b41b7[_0x30c515(0x643, '!6eZ')][_0x30c515(0x85c, 'O@hb') + 't'] || _0x1b41b7[_0x30c515(0x882, '[dUU')][_0x30c515(0x34d, 'qyfM')], _0x4ebe45 = _0x5ac19b[_0x30c515(0x23d, '[dUU') + _0x30c515(0x33e, '8*C0')](_0x17ea66);
                if (!_0x4ebe45[_0x30c515(0x5f9, 'Fpez')])
                    return;
                const _0x149e33 = _0x3b7c7c[_0x30c515(0x6b1, 'Fpez')](getMessageContent, _0x1b41b7);
                let _0x203ff5 = '';
                if (_0x149e33?.['conversati' + 'on'])
                    _0x3b7c7c[_0x30c515(0x5ac, 'rNL@')](_0x30c515(0x628, 'Kh1Y'), _0x3b7c7c[_0x30c515(0x370, 'bI!F')]) ? _0x5806ca[_0x30c515(0x4d4, 'bI!F')](_0x15981c) : _0x203ff5 = _0x149e33[_0x30c515(0x966, 'Kh1Y') + 'on'];
                else
                    _0x149e33?.[_0x30c515(0x667, 'Z&DW') + _0x30c515(0x320, 'Gz#P')]?.[_0x30c515(0x3c2, 'qyfM')] && (_0x203ff5 = _0x149e33[_0x30c515(0x884, 'Kh1Y') + _0x30c515(0x241, 'Fpez')][_0x30c515(0x568, 'v!iA')]);
                const _0x4983d5 = _0x149e33?.[_0x30c515(0xa6b, 'v!iA') + _0x30c515(0x442, '[AjO')]?.[_0x30c515(0x6b8, 'XzzT') + 'o'], _0x4eb2ab = _0x4983d5?.[_0x30c515(0x749, 'rNL@') + 'id'] || [], _0x11656a = /@all|@everyone|@全体成员/i['test'](_0x203ff5);
                let _0x256bf6 = _0x4eb2ab['length'];
                if (_0x11656a)
                    _0x256bf6 = Math[_0x30c515(0x570, 'O@hb')](_0x256bf6, 0x5);
                if (_0x256bf6 >= 0x3) {
                    const _0x1a64f0 = await _0x3b7c7c['apUdH'](isAdmin, _0x16e4c7, _0x30f828, _0x17ea66, _0x270460), _0x384b83 = _0x3b7c7c['ILywh'](isOwner, _0x30f828);
                    if (_0x1a64f0 || _0x384b83)
                        return;
                    const _0x5d2704 = await isBotAdmin(_0x16e4c7, _0x17ea66, _0x270460), _0x2d28d8 = (_0x4ebe45[_0x30c515(0x3aa, 'jH^F') + 'ion'] || _0x3b7c7c['YMZTz'])[_0x30c515(0x5db, 'IXWX') + 'e']();
                    if (_0x2d28d8 === _0x3b7c7c[_0x30c515(0x6c6, 'ih4U')] && _0x5d2704)
                        try {
                            _0x3b7c7c[_0x30c515(0x23f, 'B9Tk')](_0x3b7c7c[_0x30c515(0x98b, '9M@a')], _0x3b7c7c[_0x30c515(0x8bb, '@Ss8')]) ? _0xaa806a[_0x30c515(0x421, '!$R8')](TNDAWp[_0x30c515(0x795, 'bI!F')], _0x48965b) : (await _0x16e4c7['sendMessag' + 'e'](_0x17ea66, { 'delete': _0x1b41b7['key'] }), await _0x16e4c7['groupParti' + _0x30c515(0x5b3, '6#U$') + 'ate'](_0x17ea66, [_0x30f828], _0x3b7c7c['Dgafl']));
                        } catch (_0x3d72dc) {
                            console[_0x30c515(0x6a7, '[qEW')](_0x3b7c7c[_0x30c515(0x42e, '!$R8')], _0x3d72dc);
                        }
                    else {
                        if (_0x30c515(0x677, 'bI!F') === _0x3b7c7c[_0x30c515(0x6d9, 'B9Tk')])
                            try {
                                if (_0x3b7c7c[_0x30c515(0x893, '(49)')](_0x30c515(0x89c, 'hKmO'), _0x3b7c7c[_0x30c515(0x8e1, ')Vmg')]))
                                    await _0x16e4c7[_0x30c515(0x9a3, 'K%s%') + 'e'](_0x17ea66, { 'delete': _0x1b41b7[_0x30c515(0x2d1, '))Nx')] });
                                else {
                                    const _0x1cdd1c = _0x34d207[_0x30c515(0x94d, 'y7P]')](_0x3c0d10), _0x7e874f = [
                                            _0x30c515(0x4e0, '[dUU') + _0x30c515(0x492, 'Fpez'),
                                            _0x3b7c7c['wCYIq']
                                        ];
                                    _0x2ac6c8 = _0x1cdd1c[_0x30c515(0x50e, 'O@hb')](_0x26bf6b => !_0x7e874f[_0x30c515(0x947, 'rNL@')](_0x26bf6b));
                                }
                            } catch (_0x3c61f5) {
                                _0x3b7c7c[_0x30c515(0x491, 'K%s%')](_0x30c515(0x5b9, 'v!iA'), _0x3b7c7c['EsXvR']) ? _0x58a9fc = !![] : console['error'](_0x3b7c7c[_0x30c515(0x7f0, '!6eZ')], _0x3c61f5);
                            }
                        else {
                            if (!_0x420c35)
                                return ![];
                            const _0x25e57b = _0x3c4c6c(_0x21670e);
                            return _0x555415[_0x30c515(0x261, 'Z&DW') + 'r'][_0x30c515(0x2e1, '!$R8')](_0x25a8db => {
                                const _0x1c2543 = _0x30c515, _0x5ec753 = TNDAWp[_0x1c2543(0x6b2, '(49)')](_0x584ba3, _0x25a8db[_0x1c2543(0x494, 'Dzp9')]('@') ? _0x25a8db : _0x25a8db + (_0x1c2543(0x48c, 'Pk!v') + _0x1c2543(0x5f0, '6#U$')));
                                return TNDAWp[_0x1c2543(0x36e, '8*C0')](_0x5ec753, _0x25e57b);
                            });
                        }
                    }
                }
            }
        } catch (_0x5f480e) {
            if (_0x3b7c7c[_0x30c515(0x9d7, 'pk&V')] === _0x3b7c7c[_0x30c515(0x9b3, '9M@a')])
                console[_0x30c515(0x768, 'bI!F')](_0x3b7c7c[_0x30c515(0x67b, 'Z&DW')], _0x5f480e);
            else
                return _0x51affd[_0x30c515(0x7ba, 'fr)d') + 'e'](_0x1a8ce0, { 'text': _0x11bc44[_0x30c515(0x26a, 'bI!F')][_0x30c515(0x4ff, 'K%s%')] }, { 'quoted': _0x292f92 });
        }
    }, handleAntiSticker = async (_0x66ab22, _0x25fecf, _0xa88a4f) => {
        const _0x1888ef = _0x3337, _0x27ca93 = {
                'mOImT': function (_0x5c6c3f, _0x5b5485) {
                    return _0x5c6c3f !== _0x5b5485;
                },
                'alikn': _0x1888ef(0x29b, 'y7P]'),
                'spLTf': _0x1888ef(0x5d8, 'Yhq6'),
                'YqOuT': _0x1888ef(0x8a6, '[AjO'),
                'nBGfv': function (_0x1244e3, _0x45eabb) {
                    return _0x1244e3(_0x45eabb);
                },
                'HGeVq': function (_0x579fca, _0x2eb9f2, _0x55ad19, _0x19cd90, _0x358692) {
                    return _0x579fca(_0x2eb9f2, _0x55ad19, _0x19cd90, _0x358692);
                },
                'ZgCvr': function (_0x4cf9bc, _0x2d568e) {
                    return _0x4cf9bc(_0x2d568e);
                },
                'ljFfk': function (_0x4fbb1b, _0x542e4a) {
                    return _0x4fbb1b && _0x542e4a;
                },
                'AMzpO': _0x1888ef(0x951, '@Ss8'),
                'UzRBN': _0x1888ef(0x91f, 'ih4U'),
                'afxQY': _0x1888ef(0x8f1, '6#U$'),
                'MyPSi': _0x1888ef(0x887, 'Fpez') + _0x1888ef(0x4cb, ')Vmg') + ':'
            };
        try {
            if (_0x27ca93[_0x1888ef(0x748, 'Kh1Y')](_0x27ca93['spLTf'], _0x27ca93[_0x1888ef(0x83b, 'y7P]')])) {
                const _0x2d2f24 = _0x25fecf[_0x1888ef(0xa85, 'VX^@')]['remoteJid'], _0x115bd8 = _0x25fecf[_0x1888ef(0x1e9, 'Pk!v')][_0x1888ef(0x698, '%iYw') + 't'] || _0x25fecf[_0x1888ef(0x4f4, 'jobK')][_0x1888ef(0x94c, 'B9Tk')], _0x39bec0 = _0x5ac19b[_0x1888ef(0x3b4, '))Nx') + _0x1888ef(0x724, '[AjO')](_0x2d2f24);
                if (!_0x39bec0[_0x1888ef(0x42b, '[AjO') + 'r'])
                    return;
                const _0x2e0a75 = _0x27ca93[_0x1888ef(0x214, 'K%s%')](getMessageContent, _0x25fecf);
                if (_0x2e0a75?.[_0x1888ef(0x5fb, '(49)') + _0x1888ef(0x40b, '9M@a')]) {
                    const _0x119443 = await _0x27ca93['HGeVq'](isAdmin, _0x66ab22, _0x115bd8, _0x2d2f24, _0xa88a4f), _0x2dbca4 = _0x27ca93[_0x1888ef(0xa45, '9M@a')](isOwner, _0x115bd8);
                    if (_0x27ca93[_0x1888ef(0x5bb, '[qEW')](!_0x119443, !_0x2dbca4)) {
                        if (_0x27ca93[_0x1888ef(0x50c, 'Pk!v')] !== _0x27ca93[_0x1888ef(0x915, 'Dzp9')])
                            await _0x66ab22['sendMessag' + 'e'](_0x2d2f24, { 'delete': _0x25fecf[_0x1888ef(0x83e, '3Ek4')] });
                        else {
                            if (!_0x40954c)
                                return null;
                            if (IIfIlX[_0x1888ef(0x3b7, 'XnfP')](typeof _0x3d7c01, IIfIlX[_0x1888ef(0x549, 'jobK')]))
                                return null;
                            let _0x4b0346 = _0x555f59[_0x1888ef(0x750, ')Vmg')]('@')[0x0];
                            return _0x4b0346 = _0x4b0346[_0x1888ef(0x419, 'K%s%')](':')[0x0], _0x4b0346;
                        }
                    }
                }
            } else
                _0x398d84 = _0x1a9eca['conversati' + 'on'];
        } catch (_0x1f479e) {
            _0x27ca93[_0x1888ef(0x209, 'sOIM')] !== _0x27ca93[_0x1888ef(0x4cf, '!6eZ')] ? (_0x5545db = _0x5e5bf7[_0x1888ef(0xa70, 'aUOA') + _0x1888ef(0xa5b, 'cl&d')][_0x1888ef(0x806, 'XnfP')], _0x2f6462 = 'extendedTe' + 'xtMessage') : console['error'](_0x27ca93[_0x1888ef(0x2d0, 'O@hb')], _0x1f479e);
        }
    }, handleAntiGroupMention = async (_0x1974ed, _0xac3c, _0x16209f) => {
        const _0x53d654 = _0x3337, _0x2ece90 = {
                'XKdkU': function (_0x52b0f9, _0x6ab6e7) {
                    return _0x52b0f9 === _0x6ab6e7;
                },
                'yGEvf': _0x53d654(0x7cb, 'Dzp9'),
                'aeegL': function (_0x52a879, _0x5b2c8e) {
                    return _0x52a879(_0x5b2c8e);
                },
                'MlKGQ': function (_0x648d1c, _0x1bd93e) {
                    return _0x648d1c || _0x1bd93e;
                },
                'pZVts': _0x53d654(0x24d, 'eo]Y') + _0x53d654(0x30a, 'Fpez') + 'ntion:'
            };
        try {
            if (_0x2ece90['XKdkU'](_0x2ece90[_0x53d654(0x22d, '))Nx')], _0x2ece90[_0x53d654(0x90b, 'y7P]')])) {
                const _0x3fd413 = _0xac3c['key']['remoteJid'], _0x5b7c65 = _0xac3c[_0x53d654(0x8b9, 'v!iA')][_0x53d654(0x85c, 'O@hb') + 't'] || _0xac3c['key'][_0x53d654(0x9ae, 'O@hb')], _0x22cf8e = _0x5ac19b[_0x53d654(0xa78, 'hKmO') + _0x53d654(0x87b, 'sOIM')](_0x3fd413);
                if (!_0x22cf8e['antigroupm' + _0x53d654(0x74e, 'eCWM')])
                    return;
                const _0x87a095 = getMessageContent(_0xac3c);
                let _0x49ff7c = ![];
                if (_0x87a095?.[_0x53d654(0x2c9, 'IXWX') + _0x53d654(0x441, 'ZS%t') + _0x53d654(0x652, '%iYw')])
                    _0x49ff7c = !![];
                if (_0x87a095?.[_0x53d654(0x9d0, '6#U$') + _0x53d654(0x4ae, '))Nx')] && _0x87a095[_0x53d654(0x663, 'jobK') + _0x53d654(0x5ae, '!6eZ')]['type'] === 0x19)
                    _0x49ff7c = !![];
                const _0x4eb8a5 = _0x87a095?.['extendedTe' + _0x53d654(0x9ea, '!6eZ')]?.['contextInf' + 'o'];
                if (_0x4eb8a5?.[_0x53d654(0x95d, 'XnfP') + 'd'] || _0x4eb8a5?.[_0x53d654(0x405, 'VbOS') + _0x53d654(0x3ea, 'B9Tk')])
                    _0x49ff7c = !![];
                if (_0x4eb8a5?.[_0x53d654(0x332, 'ZS%t') + _0x53d654(0x388, 'jobK') + _0x53d654(0x72e, 'v!iA')])
                    _0x49ff7c = !![];
                const _0x241500 = getMessageText(_0x87a095);
                if (_0x241500 && /@g\.us|@group|@全体成员/i[_0x53d654(0x9b5, 'eo]Y')](_0x241500))
                    _0x49ff7c = !![];
                if (_0x49ff7c) {
                    const _0x6dbc40 = await isAdmin(_0x1974ed, _0x5b7c65, _0x3fd413, _0x16209f), _0x4ba7fb = _0x2ece90[_0x53d654(0x7b7, 'XzzT')](isOwner, _0x5b7c65);
                    if (_0x2ece90[_0x53d654(0x9ce, 'VX^@')](_0x6dbc40, _0x4ba7fb))
                        return;
                    await _0x1974ed[_0x53d654(0x2b7, 'jH^F') + 'e'](_0x3fd413, { 'delete': _0xac3c['key'] });
                }
            } else
                _0x5a53af = _0x42b36f[_0x53d654(0xa20, '))Nx') + _0x53d654(0x37b, '(49)')][_0x53d654(0x3d1, 'eo]Y')];
        } catch (_0x237f82) {
            console[_0x53d654(0x292, 'Fpez')](_0x2ece90[_0x53d654(0x47c, 'rNL@')], _0x237f82);
        }
    }, handleAutoReact = async (_0x369635, _0x2664ed, _0x1fe80f) => {
        const _0x446b8f = _0x3337, _0x3ade55 = {
                'CZcdq': _0x446b8f(0x5a9, 'dxeI'),
                'zyaHP': _0x446b8f(0x848, 'pk&V') + 'roup\x20updat' + 'e:',
                'vOiGD': _0x446b8f(0x67c, 'ih4U') + 'on',
                'JIkNN': function (_0x415544, _0x582d00) {
                    return _0x415544(_0x582d00);
                },
                'Zacib': function (_0x3607ec, _0x4432a5) {
                    return _0x3607ec > _0x4432a5;
                },
                'fFDuU': function (_0x332088, _0x1959dc) {
                    return _0x332088 - _0x1959dc;
                },
                'eTmne': function (_0xa50707, _0x3b48d4) {
                    return _0xa50707 === _0x3b48d4;
                },
                'ivSNP': _0x446b8f(0x594, 'W#(8') + _0x446b8f(0xa6f, 'jH^F') + _0x446b8f(0x8ce, '3Ek4'),
                'MbLdh': _0x446b8f(0x41b, 'eCWM'),
                'kZQPq': function (_0x3dda01, _0xc6a421) {
                    return _0x3dda01 !== _0xc6a421;
                },
                'kGqLh': _0x446b8f(0x4e5, 'IXWX'),
                'OkgBP': _0x446b8f(0x93d, 'XnfP'),
                'LufeB': function (_0x1873e4, _0x4a099c) {
                    return _0x1873e4 > _0x4a099c;
                },
                'inOIn': _0x446b8f(0x984, 'IXWX'),
                'BhDOJ': function (_0x2fe047, _0x301899) {
                    return _0x2fe047 * _0x301899;
                },
                'pKCXk': _0x446b8f(0x21c, 'NOkJ') + _0x446b8f(0x674, '[dUU')
            };
        try {
            if (_0x3ade55[_0x446b8f(0x7ea, 'Pk!v')](_0x446b8f(0x723, 'ZS%t'), _0x446b8f(0x427, 'eo]Y'))) {
                const {autoReactSettings: _0x2928d9} = await import(_0x3ade55[_0x446b8f(0x85d, 'hKmO')]);
                if (!_0x2928d9[_0x446b8f(0x7a5, '%iYw')])
                    return;
                const {
                        from: _0x5ce41f,
                        body: _0x3ec954,
                        prefix: _0x51e651
                    } = _0x1fe80f, _0x12e4b9 = _0x3ec954?.[_0x446b8f(0x6ba, '%iYw')](_0x51e651);
                let _0x26ee70 = ![];
                if (_0x2928d9[_0x446b8f(0x1f9, '8*C0')] === _0x3ade55[_0x446b8f(0x68e, 'B9Tk')])
                    _0x3ade55[_0x446b8f(0x38f, '9M@a')](_0x446b8f(0x47f, 'eCWM'), _0x446b8f(0x596, 'hKmO')) ? _0x26ee70 = !![] : !_0x6bd360[_0x446b8f(0x5eb, '@Ss8')]?.['includes'](_0x3ade55[_0x446b8f(0x1fa, 'hKmO')]) && _0x16f39f[_0x446b8f(0x622, 'jH^F')](_0x3ade55[_0x446b8f(0x25e, 'dxeI')], _0x25a5d0);
                else
                    _0x2928d9[_0x446b8f(0xa71, '!6eZ')] === _0x3ade55[_0x446b8f(0x2b0, 'ZS%t')] && _0x12e4b9 && (_0x3ade55[_0x446b8f(0xa7c, 'sOIM')](_0x446b8f(0x502, 'Dzp9'), _0x3ade55[_0x446b8f(0x742, 'Kh1Y')]) ? _0x26ee70 = !![] : (_0x4a440d = _0x1e3fa0[_0x446b8f(0x7df, 'Gz#P') + 'on'], _0x2c48ba = jhdLBX[_0x446b8f(0xabd, 'O@hb')]));
                if (_0x26ee70 && _0x3ade55[_0x446b8f(0x5e1, 'XzzT')](_0x2928d9['emojis']['length'], 0x0)) {
                    if (_0x3ade55[_0x446b8f(0x4ab, 'XnfP')](_0x3ade55[_0x446b8f(0x6a6, 'eCWM')], _0x446b8f(0x56a, 'jobK'))) {
                        const _0x2d4340 = _0x2928d9['emojis'][Math[_0x446b8f(0x333, 'jH^F')](_0x3ade55[_0x446b8f(0x61d, 'VYw$')](Math['random'](), _0x2928d9[_0x446b8f(0x593, 'Kh1Y')][_0x446b8f(0x5c5, '[qEW')]))];
                        await _0x369635[_0x446b8f(0x928, 'Kh1Y') + 'e'](_0x5ce41f, {
                            'react': {
                                'text': _0x2d4340,
                                'key': _0x2664ed[_0x446b8f(0x3dc, 'cl&d')]
                            }
                        }), console['log']('[AutoReact' + _0x446b8f(0x447, 'jobK') + 'with\x20' + _0x2d4340 + _0x446b8f(0x794, 'jH^F') + (_0x12e4b9 ? _0x446b8f(0x74d, '9M@a') : _0x446b8f(0x8fe, '8*C0')) + _0x446b8f(0x357, 'XzzT') + _0x1fe80f[_0x446b8f(0x53b, '8*C0')]?.[_0x446b8f(0x407, '@Ss8')]('@')[0x0]);
                    } else {
                        const _0x127806 = jhdLBX[_0x446b8f(0xaa8, 'NOkJ')](_0x330b72, _0x3ff169);
                        return _0x4cb0ce[_0x446b8f(0x7b8, 'Fpez') + 'r'](_0x127806);
                    }
                }
            } else
                jhdLBX[_0x446b8f(0x7db, 'eo]Y')](jhdLBX[_0x446b8f(0x752, 'jobK')](_0x53d23d, _0x4ed177[_0x446b8f(0x740, 'cl&d')]), _0xcbc19) && _0x367edb[_0x446b8f(0x8d0, '%iYw')](_0x2817e0);
        } catch (_0x5b2534) {
            console[_0x446b8f(0x866, 'aUOA')](_0x3ade55[_0x446b8f(0x294, 'NOkJ')], _0x5b2534);
        }
    }, handleGroupUpdate = async (_0x4cbf02, _0x3e9ca3) => {
        const _0x554b76 = _0x3337, _0x448a9b = {
                'gaVMg': _0x554b76(0x444, 'jH^F') + _0x554b76(0x6f9, '@Ss8'),
                'qAbLZ': _0x554b76(0x65a, 'B9Tk') + _0x554b76(0x75c, 'pk&V') + _0x554b76(0x551, 'O@hb'),
                'iwDUY': _0x554b76(0x456, 'bI!F') + _0x554b76(0x7d1, 'XzzT') + _0x554b76(0x411, 'pk&V'),
                'aIiiG': _0x554b76(0x688, 'Fpez'),
                'cZLdv': _0x554b76(0xa56, 'B9Tk') + 'ge',
                'scQin': function (_0x11e42d, _0x60768c) {
                    return _0x11e42d !== _0x60768c;
                },
                'uVIKP': 'mIvJK',
                'Ogdcp': '@g.us',
                'xepIL': 'utils/bot_' + _0x554b76(0x5e3, 'hKmO'),
                'tmRxg': function (_0x48eee9, _0x3b180d) {
                    return _0x48eee9 === _0x3b180d;
                },
                'PILpo': _0x554b76(0x500, 'Fpez'),
                'jqaAy': function (_0x21c08f, _0x517115) {
                    return _0x21c08f(_0x517115);
                },
                'TKyne': _0x554b76(0x79c, '[qEW'),
                'zQfvN': '2-digit',
                'tlnCY': function (_0x5a5fdf, _0x26ce02) {
                    return _0x5a5fdf !== _0x26ce02;
                },
                'SzePp': _0x554b76(0x781, '[AjO'),
                'bVgXl': _0x554b76(0x31a, 'NOkJ'),
                'ykPgF': _0x554b76(0x853, ')Vmg') + 'r',
                'vuFFK': function (_0x11476d, _0x5e6b8c) {
                    return _0x11476d !== _0x5e6b8c;
                },
                'bKGnw': 'bmCHb',
                'IEroC': _0x554b76(0x56e, 'qyfM'),
                'EtbYu': _0x554b76(0x2a8, 'Kh1Y'),
                'yAQLj': _0x554b76(0x493, '9M@a'),
                'RnJBG': _0x554b76(0xaa9, 'XzzT'),
                'jfWSD': _0x554b76(0x5a5, 'jobK'),
                'SDKpL': function (_0x725084, _0x3c550d) {
                    return _0x725084 - _0x3c550d;
                },
                'tjSnM': function (_0x5c0617, _0x1f64ca) {
                    return _0x5c0617 === _0x1f64ca;
                },
                'PVDMe': _0x554b76(0x20f, '[dUU'),
                'oeWGB': _0x554b76(0x4ce, 'eo]Y'),
                'LGzQq': _0x554b76(0x646, 'v!iA')
            };
        try {
            if (_0x448a9b[_0x554b76(0x52c, 'W#(8')](_0x554b76(0xa49, '(49)'), _0x448a9b[_0x554b76(0x4dd, 'aUOA')])) {
                const {
                    id: _0x28a519,
                    participants: _0x34e2f0,
                    action: _0x469592
                } = _0x3e9ca3;
                if (!_0x28a519 || !_0x28a519[_0x554b76(0x94f, 'B9Tk')](_0x448a9b[_0x554b76(0x9f1, 'Z&DW')]))
                    return;
                const _0x5acc26 = _0x5ac19b['getGroupSe' + _0x554b76(0xa94, 'Dzp9')](_0x28a519), _0x5ce343 = await _0x4cbf02[_0x554b76(0x67d, 'jobK') + _0x554b76(0x3eb, 'VbOS')](_0x28a519);
                if (!_0x5ce343)
                    return;
                const _0x18d12b = _0x1bb592[_0x554b76(0x948, 'ZS%t')](__dirname, _0x448a9b[_0x554b76(0x8dd, ')Vmg')]);
                for (const _0x5457d9 of _0x34e2f0) {
                    const _0x119265 = _0x448a9b[_0x554b76(0x7c5, 'cl&d')](typeof _0x5457d9, _0x448a9b[_0x554b76(0x81d, 'ih4U')]) ? _0x5457d9 : _0x5457d9['id'];
                    if (!_0x119265)
                        continue;
                    const _0x5dba56 = _0x448a9b[_0x554b76(0x7d7, '))Nx')](normalizeJid, _0x119265), _0xff8e90 = new Date(), _0x5eb4a2 = _0xff8e90[_0x554b76(0x631, 'Z&DW') + _0x554b76(0xa8e, '(49)')](_0x448a9b[_0x554b76(0x638, 'v!iA')], {
                            'hour': _0x448a9b[_0x554b76(0x8bf, 'jobK')],
                            'minute': _0x554b76(0x7a9, 'eo]Y')
                        }), _0x5abe06 = _0xff8e90[_0x554b76(0x4c9, '!$R8') + _0x554b76(0x954, 'K%s%')](), _0x59d5f4 = _0x5ce343[_0x554b76(0x651, '))Nx') + 'ts']?.[_0x554b76(0x6d0, 'cl&d')] || 0x0;
                    let _0x23c97c = null;
                    try {
                        if (_0x448a9b[_0x554b76(0x717, '9M@a')](_0x448a9b['SzePp'], _0x448a9b[_0x554b76(0x331, 'v!iA')])) {
                            const _0x1b5c0e = _0x246df7(_0x42ef3a['id']);
                            return _0x1b5c0e === _0x1eb417;
                        } else {
                            const _0x215a57 = await _0x4cbf02[_0x554b76(0x3fa, 'Gz#P') + _0x554b76(0x5a6, 'eo]Y')](_0x119265, _0x448a9b[_0x554b76(0xa79, 'rNL@')]), _0x340575 = await axios[_0x554b76(0x2d4, 'O@hb')](_0x215a57, { 'responseType': _0x448a9b[_0x554b76(0xa67, 'dxeI')] });
                            _0x23c97c = Buffer[_0x554b76(0x5cb, 'K%s%')](_0x340575[_0x554b76(0x57b, '[qEW')]);
                        }
                    } catch (_0x33f20d) {
                        _0x448a9b[_0x554b76(0xa0b, 'Fpez')](_0x554b76(0x6bd, 'NOkJ'), _0x448a9b[_0x554b76(0x671, 'Pk!v')]) ? _0x5d4b2d['existsSync'](_0x18d12b) && (_0x448a9b[_0x554b76(0x7c3, 'sOIM')](_0x448a9b[_0x554b76(0xa97, '6#U$')], _0x448a9b[_0x554b76(0x968, 'jH^F')]) ? _0x23c97c = _0x5d4b2d[_0x554b76(0x777, 'O@hb') + 'nc'](_0x18d12b) : _0x2fb8be[_0x554b76(0x1ef, 'dxeI')](UrkYEP[_0x554b76(0x9d1, ')Vmg')], _0x4395cf)) : _0x438576['error'](UrkYEP[_0x554b76(0x2c4, 'sOIM')], _0x50676f);
                    }
                    if (_0x448a9b[_0x554b76(0x3cd, 'v!iA')](_0x469592, _0x448a9b[_0x554b76(0x2be, '8*C0')]) && _0x5acc26['welcome']) {
                        let _0x4dbd43 = _0x5acc26[_0x554b76(0x517, '[qEW') + _0x554b76(0x955, 'Kh1Y')] || _0x2523a0[_0x554b76(0x864, '9M@a') + _0x554b76(0x396, 'eo]Y')][_0x554b76(0x3f8, '%iYw') + _0x554b76(0x765, 'y7P]')];
                        _0x4dbd43 = _0x4dbd43[_0x554b76(0xaa3, 'O@hb')](/@user/g, '@' + _0x5dba56)[_0x554b76(0x714, 'y7P]')](/@group/g, _0x5ce343[_0x554b76(0x3da, '[AjO')])['replace'](/#memberCount/g, _0x59d5f4[_0x554b76(0x2b8, '%iYw')]())[_0x554b76(0x5e5, 'sOIM')](/#time/g, _0x5eb4a2)[_0x554b76(0x7eb, 'Z&DW')](/#date/g, _0x5abe06);
                        if (_0x23c97c) {
                            if (_0x448a9b[_0x554b76(0x967, 'bI!F')] !== _0x448a9b['RnJBG'])
                                await _0x4cbf02[_0x554b76(0x2b7, 'jH^F') + 'e'](_0x28a519, {
                                    'image': _0x23c97c,
                                    'caption': _0x4dbd43,
                                    'mentions': [_0x119265]
                                });
                            else {
                                if (!_0x2cb442 || !_0x420bb7[_0x554b76(0x6e2, 'hKmO')])
                                    return null;
                                let _0x5a7b3d = _0x28c6b2['message'];
                                if (_0x5a7b3d['ephemeralM' + 'essage'])
                                    _0x5a7b3d = _0x5a7b3d[_0x554b76(0x97f, '@Ss8') + _0x554b76(0x203, '%iYw')][_0x554b76(0x648, '[AjO')];
                                if (_0x5a7b3d[_0x554b76(0x443, 'jobK') + _0x554b76(0x921, 'VYw$')])
                                    _0x5a7b3d = _0x5a7b3d[_0x554b76(0xa57, 'ZS%t') + _0x554b76(0x964, '[qEW')][_0x554b76(0x3a3, 'fr)d')];
                                if (_0x5a7b3d[_0x554b76(0x6e5, 'Z&DW') + 'ssage'])
                                    _0x5a7b3d = _0x5a7b3d[_0x554b76(0x219, 'Dzp9') + _0x554b76(0x71a, 'IXWX')][_0x554b76(0xab9, 'O@hb')];
                                if (_0x5a7b3d['documentWi' + _0x554b76(0x243, 'Gz#P') + _0x554b76(0x3c9, '8*C0')])
                                    _0x5a7b3d = _0x5a7b3d['documentWi' + _0x554b76(0xa2b, 'hKmO') + _0x554b76(0x277, 'jH^F')][_0x554b76(0x562, 'W#(8')];
                                return _0x5a7b3d;
                            }
                        } else
                            await _0x4cbf02['sendMessag' + 'e'](_0x28a519, {
                                'text': _0x4dbd43,
                                'mentions': [_0x119265]
                            });
                    } else {
                        if (_0x469592 === _0x554b76(0x843, 'y7P]') && _0x5acc26[_0x554b76(0x2cf, '3Ek4')]) {
                            if (_0x448a9b['tmRxg'](_0x448a9b[_0x554b76(0x7e6, 'aUOA')], _0x448a9b['jfWSD'])) {
                                let _0x27fbdf = _0x5acc26[_0x554b76(0x77c, 'K%s%') + 'sage'] || _0x2523a0[_0x554b76(0x95e, 'cl&d') + _0x554b76(0x396, 'eo]Y')][_0x554b76(0x9c1, '%iYw') + _0x554b76(0x971, 'B9Tk')];
                                _0x27fbdf = _0x27fbdf[_0x554b76(0x454, '!6eZ')](/@user/g, '@' + _0x5dba56)[_0x554b76(0x8e5, 'NOkJ')](/@group/g, _0x5ce343['subject'])[_0x554b76(0x35f, 'pk&V')](/#memberCount/g, _0x448a9b['SDKpL'](_0x59d5f4, 0x1)[_0x554b76(0x7f7, '[qEW')]())['replace'](/#time/g, _0x5eb4a2)[_0x554b76(0x9bb, 'aUOA')](/#date/g, _0x5abe06);
                                if (_0x23c97c)
                                    await _0x4cbf02[_0x554b76(0x32f, '!6eZ') + 'e'](_0x28a519, {
                                        'image': _0x23c97c,
                                        'caption': _0x27fbdf,
                                        'mentions': [_0x119265]
                                    });
                                else {
                                    if (_0x448a9b[_0x554b76(0x914, 'NOkJ')](_0x448a9b[_0x554b76(0x89e, 'rNL@')], _0x448a9b[_0x554b76(0x633, 'Kh1Y')]))
                                        return _0x193aec[_0x554b76(0x68f, 'aUOA') + 'e'](_0x3a8f60, { 'text': _0x448a9b['iwDUY'] }, { 'quoted': _0x276f8e });
                                    else
                                        await _0x4cbf02['sendMessag' + 'e'](_0x28a519, {
                                            'text': _0x27fbdf,
                                            'mentions': [_0x119265]
                                        });
                                }
                            } else
                                _0x5be8f4 = _0x1ca3cf[_0x554b76(0x31d, 'K%s%') + 'ge'][_0x554b76(0x25d, '(49)')] || UrkYEP[_0x554b76(0x70d, '3Ek4')], _0x660acc = UrkYEP['cZLdv'];
                        }
                    }
                }
            } else {
                const _0x4484c8 = _0x1e2f2a[_0x554b76(0x6da, 'pk&V') + _0x554b76(0x755, 'XnfP')](_0xd84f48);
                _0x2f0b21 = _0x4484c8[_0x554b76(0x4a0, 'sOIM')] || ![];
            }
        } catch (_0x243a38) {
            !_0x243a38[_0x554b76(0x20c, '))Nx')]?.['includes'](_0x448a9b[_0x554b76(0x7ff, '6#U$')]) && console['error']('Error\x20in\x20g' + _0x554b76(0x506, 'Gz#P') + 'e:', _0x243a38);
        }
    }, handleButtonResponse = async (_0x3fb2ce, _0x58f163, _0x1f6eb4) => {
        const _0x4609df = _0x3337, _0x49f3f1 = {
                'YbAHB': _0x4609df(0x9e6, 'ih4U') + _0x4609df(0xa4f, 'IXWX'),
                'ilYzw': _0x4609df(0x8eb, 'ih4U') + _0x4609df(0x380, '!6eZ') + 'ntion:',
                'tMWVb': function (_0x2cc8cd, _0x4fdb72) {
                    return _0x2cc8cd > _0x4fdb72;
                },
                'KjGBW': function (_0x205cce, _0x2553cf) {
                    return _0x205cce - _0x2553cf;
                },
                'tXEFA': _0x4609df(0x5b0, ')Vmg') + _0x4609df(0x539, 'VbOS') + _0x4609df(0x99d, 'v!iA'),
                'NrLfi': 'Error\x20in\x20g' + _0x4609df(0x45d, 'IXWX') + 'e:',
                'ZrCHH': function (_0x474282, _0x22a3d2) {
                    return _0x474282 === _0x22a3d2;
                },
                'palJT': 'stickerMes' + _0x4609df(0x236, 'pk&V'),
                'KAWZy': _0x4609df(0x98c, '8*C0') + _0x4609df(0x34e, 'bI!F'),
                'vuhHh': '[Audio]',
                'iOIKM': _0x4609df(0x72d, 'Dzp9') + 'ge',
                'jDenR': function (_0x37058f, _0x10cdb8) {
                    return _0x37058f === _0x10cdb8;
                },
                'JMZEI': _0x4609df(0x42c, 'qyfM'),
                'oUehK': _0x4609df(0x98a, 'sOIM'),
                'zGfDA': _0x4609df(0x834, 'Z&DW'),
                'wbSjq': function (_0x2c9d5d, _0x32ae5d) {
                    return _0x2c9d5d + _0x32ae5d;
                },
                'tLmuJ': function (_0x199712, _0x4746ff) {
                    return _0x199712 + _0x4746ff;
                },
                'CWKkN': function (_0x5e7842, _0x1213ff) {
                    return _0x5e7842 + _0x1213ff;
                },
                'TfhBx': function (_0x1e14f1, _0x492281) {
                    return _0x1e14f1 + _0x492281;
                },
                'aZQZX': function (_0x4bb89e, _0xd71c9b) {
                    return _0x4bb89e + _0xd71c9b;
                },
                'tTWHj': function (_0x139caf, _0x211dd4) {
                    return _0x139caf + _0x211dd4;
                },
                'tFdaM': _0x4609df(0x93b, 'v!iA') + _0x4609df(0x3d9, 'W#(8'),
                'besaw': function (_0x3377d2, _0x4b20ee) {
                    return _0x3377d2 + _0x4b20ee;
                },
                'SUeOx': function (_0x16e553, _0x4938d5) {
                    return _0x16e553 + _0x4938d5;
                },
                'yXVMT': function (_0x162679, _0x34cd93) {
                    return _0x162679 + _0x34cd93;
                },
                'yHExE': function (_0x30c3fd, _0x53042d) {
                    return _0x30c3fd + _0x53042d;
                },
                'AMmuO': function (_0x26c2be, _0x24105d) {
                    return _0x26c2be + _0x24105d;
                },
                'FbwIB': function (_0x4d1e3c, _0x2cc74c) {
                    return _0x4d1e3c + _0x2cc74c;
                },
                'IIGVL': function (_0x31740e, _0xdb87a3) {
                    return _0x31740e === _0xdb87a3;
                },
                'YufOO': _0x4609df(0x767, 'IXWX') + _0x4609df(0x9d4, 'Pk!v'),
                'AAlRs': function (_0x204edd, _0x28b329) {
                    return _0x204edd + _0x28b329;
                },
                'NsSZp': function (_0x2febda, _0x3daf72) {
                    return _0x2febda + _0x3daf72;
                },
                'SQXTS': function (_0x25eacd, _0x14f6cc) {
                    return _0x25eacd + _0x14f6cc;
                },
                'bmsGJ': function (_0x269e1c, _0x36db25) {
                    return _0x269e1c + _0x36db25;
                },
                'xtEOX': function (_0x251b0d, _0x27962a) {
                    return _0x251b0d + _0x27962a;
                },
                'HiDDm': function (_0x27b6da, _0x91ac6b) {
                    return _0x27b6da + _0x91ac6b;
                },
                'PqWRU': function (_0x227ff2, _0x477c75) {
                    return _0x227ff2 !== _0x477c75;
                },
                'dIgFw': _0x4609df(0x7c0, 'bI!F'),
                'nEWoy': 'Brcal',
                'cjYOw': _0x4609df(0x999, '9M@a') + '389inrrurd' + _0x4609df(0x56f, 'ZS%t') + _0x4609df(0x68b, '6#U$'),
                'ZZLGv': function (_0x4cb948, _0x23fc41) {
                    return _0x4cb948 + _0x23fc41;
                },
                'IgMsx': function (_0x730c3c, _0x5616d8) {
                    return _0x730c3c + _0x5616d8;
                },
                'hDWGu': function (_0x55d755, _0xc607a) {
                    return _0x55d755 + _0xc607a;
                },
                'mXYbP': function (_0x1cc6af, _0xc0409f) {
                    return _0x1cc6af + _0xc0409f;
                },
                'Tippc': function (_0x47f5e2, _0x1df878) {
                    return _0x47f5e2 + _0x1df878;
                },
                'piFsK': function (_0x275cfb, _0x3a5f4b) {
                    return _0x275cfb + _0x3a5f4b;
                },
                'fQqoF': function (_0x2658b2, _0x485992) {
                    return _0x2658b2 + _0x485992;
                },
                'GAXXh': 'ZUKO\x20MD\x20Up' + _0x4609df(0x621, '%iYw'),
                'XVFKT': _0x4609df(0x4d3, 'IXWX') + _0x4609df(0x29c, 'eo]Y'),
                'jsHAi': function (_0x7e055b, _0x298d01) {
                    return _0x7e055b + _0x298d01;
                },
                'zsdpB': function (_0x177fa7, _0x23e06e) {
                    return _0x177fa7 + _0x23e06e;
                },
                'uwFrb': function (_0x3e577c, _0x3f701) {
                    return _0x3e577c + _0x3f701;
                },
                'PbvQg': function (_0x25bf72, _0x333c86) {
                    return _0x25bf72 + _0x333c86;
                },
                'SvqXq': function (_0x45cb1d, _0x41deb2) {
                    return _0x45cb1d + _0x41deb2;
                },
                'ywwQg': function (_0x392e12, _0x21342) {
                    return _0x392e12 + _0x21342;
                },
                'DgkgR': function (_0x157860, _0x423e5a) {
                    return _0x157860 + _0x423e5a;
                },
                'kIEvs': function (_0x31b2b7, _0xd74070) {
                    return _0x31b2b7 + _0xd74070;
                },
                'aFBOy': function (_0x203e83, _0x2cd479) {
                    return _0x203e83 + _0x2cd479;
                },
                'McaFO': function (_0xab6a46, _0x22199b) {
                    return _0xab6a46 + _0x22199b;
                },
                'IPbIp': function (_0x2c146c, _0x16439b) {
                    return _0x2c146c + _0x16439b;
                },
                'qOilx': _0x4609df(0xa6d, 'fr)d') + _0x4609df(0x460, 'sOIM'),
                'kOgda': function (_0x87d48f, _0x2f9074) {
                    return _0x87d48f !== _0x2f9074;
                },
                'GjmJS': _0x4609df(0x43a, 'eCWM'),
                'HcJiA': function (_0x5a7cc7, _0x51579b) {
                    return _0x5a7cc7 + _0x51579b;
                },
                'wjzCL': function (_0x248de2, _0x36c0a4) {
                    return _0x248de2 + _0x36c0a4;
                },
                'lqptg': function (_0x41978a, _0x4c024d) {
                    return _0x41978a + _0x4c024d;
                },
                'wujkz': function (_0x5b597e, _0x5eebfe) {
                    return _0x5b597e + _0x5eebfe;
                },
                'pdvtN': function (_0x45a99b, _0xd0c93e) {
                    return _0x45a99b + _0xd0c93e;
                },
                'ZNnBX': function (_0x32ebce, _0x1f1a53) {
                    return _0x32ebce + _0x1f1a53;
                },
                'jePYQ': function (_0x597195, _0x1a0ff6) {
                    return _0x597195 + _0x1a0ff6;
                },
                'tmRju': function (_0x42bf0c, _0x104543) {
                    return _0x42bf0c + _0x104543;
                },
                'kpIId': function (_0x143cf2, _0x379585) {
                    return _0x143cf2 + _0x379585;
                },
                'KEdlw': function (_0x1a7d70, _0x18c57e) {
                    return _0x1a7d70 + _0x18c57e;
                },
                'dXrem': 'menu_games',
                'Kyftr': function (_0x5da5ba, _0x994d1f) {
                    return _0x5da5ba + _0x994d1f;
                },
                'hIiOM': function (_0x169fee, _0x58a1e6) {
                    return _0x169fee + _0x58a1e6;
                },
                'WaRkg': function (_0x349c3e, _0x3a5411) {
                    return _0x349c3e + _0x3a5411;
                },
                'ZHaYT': function (_0x1cc0f3, _0x9eaa6d) {
                    return _0x1cc0f3 + _0x9eaa6d;
                },
                'kabBk': function (_0xbc5168, _0x4bd4ab) {
                    return _0xbc5168 + _0x4bd4ab;
                },
                'rmcsF': _0x4609df(0x4c1, 'jH^F'),
                'AjGOI': 'jSGAy',
                'uXsnR': _0x4609df(0x6f4, 'ZS%t'),
                'VXlNg': function (_0x26060f, _0x15e0c8) {
                    return _0x26060f + _0x15e0c8;
                },
                'oQDht': function (_0x2cfd21, _0x49978b) {
                    return _0x2cfd21 + _0x49978b;
                },
                'fwFDx': function (_0xfc42e9, _0x257c6b) {
                    return _0xfc42e9 + _0x257c6b;
                },
                'xmFFd': function (_0x2da02b, _0x246356) {
                    return _0x2da02b + _0x246356;
                },
                'WWlep': function (_0x30c513, _0x30d8f3) {
                    return _0x30c513 + _0x30d8f3;
                },
                'xsnBg': function (_0x3639f3, _0x37e5ec) {
                    return _0x3639f3 + _0x37e5ec;
                },
                'eibeH': function (_0x1bb7b5, _0x6d4020) {
                    return _0x1bb7b5 + _0x6d4020;
                },
                'NROMw': function (_0x322d57, _0x5c2429) {
                    return _0x322d57 + _0x5c2429;
                },
                'GvEXY': function (_0x5a6720, _0x32530b) {
                    return _0x5a6720 + _0x32530b;
                },
                'ZzdUD': function (_0x4e5629, _0x54290c) {
                    return _0x4e5629 + _0x54290c;
                },
                'zlHTP': _0x4609df(0x4db, 'jobK') + 'n',
                'nolfA': function (_0x2a47ee, _0x2fbf6a) {
                    return _0x2a47ee === _0x2fbf6a;
                },
                'ByWau': _0x4609df(0x8f8, 'eCWM') + 'ff',
                'pzXVk': function (_0x356189, _0x42ac7d) {
                    return _0x356189 !== _0x42ac7d;
                },
                'DvcwC': _0x4609df(0x685, ')Vmg'),
                'stzPD': _0x4609df(0x212, 'aUOA'),
                'OeeEm': _0x4609df(0x4a1, '@Ss8'),
                'oUPOX': _0x4609df(0x412, 'Gz#P') + _0x4609df(0x4d1, 'fr)d'),
                'BlFbN': function (_0xe7cac, _0x22bfd1) {
                    return _0xe7cac === _0x22bfd1;
                },
                'mVnpn': 'tVxQK',
                'ynaZu': _0x4609df(0x831, '(49)'),
                'gYeDV': 'Wrgkr',
                'mgCpw': _0x4609df(0x718, 'K%s%'),
                'mwTjw': _0x4609df(0xa33, '!6eZ'),
                'bUDOb': _0x4609df(0x433, 'O@hb'),
                'cABqb': 'antilink_a' + 'ction_kick',
                'FBuMq': _0x4609df(0x9df, '%iYw'),
                'HhvoI': _0x4609df(0x7fd, 'W#(8'),
                'QKjAc': function (_0x3736d3, _0x4cd8cd) {
                    return _0x3736d3 === _0x4cd8cd;
                },
                'HfTOk': _0x4609df(0x474, 'VbOS') + 'f',
                'vpCTv': _0x4609df(0x416, '3Ek4'),
                'AyslM': function (_0x42f5fc, _0x41f5a0) {
                    return _0x42f5fc === _0x41f5a0;
                },
                'vSZMq': _0x4609df(0x83f, '[dUU') + _0x4609df(0x649, 'Z&DW'),
                'OECco': 'pjAHN',
                'cAxXA': 'settings',
                'qHVBQ': function (_0x587f11, _0x471fd0) {
                    return _0x587f11 === _0x471fd0;
                },
                'xltSg': _0x4609df(0x39c, 'jH^F') + _0x4609df(0x288, '9M@a') + 'e',
                'DRHfi': function (_0x24caaf, _0x161f9e) {
                    return _0x24caaf === _0x161f9e;
                },
                'KbmEl': 'AQMkR',
                'bZxar': function (_0x316940, _0x2fa9b3) {
                    return _0x316940 === _0x2fa9b3;
                },
                'LBvKZ': _0x4609df(0x701, 'IXWX') + _0x4609df(0x9b9, '[AjO'),
                'UgHCe': _0x4609df(0x6fd, 'W#(8') + 'r',
                'mspuS': function (_0x5cc7e5, _0x1c6e03) {
                    return _0x5cc7e5 === _0x1c6e03;
                },
                'dhtBT': _0x4609df(0x895, 'Kh1Y') + 'r_off',
                'DfOkM': _0x4609df(0x5d3, '))Nx') + _0x4609df(0x88e, 'rNL@'),
                'ycNUN': _0x4609df(0x92c, 'jH^F'),
                'PSgbB': _0x4609df(0x8aa, 'y7P]') + 'ention_on',
                'CFskC': _0x4609df(0x449, 'hKmO') + _0x4609df(0x69e, 'K%s%'),
                'SaOSg': function (_0x123083, _0x19fecf) {
                    return _0x123083 === _0x19fecf;
                },
                'thSjb': _0x4609df(0x7ec, 'Z&DW'),
                'mgUTn': _0x4609df(0xa47, 'qyfM'),
                'VoKdq': 'antigroupm' + _0x4609df(0x629, 'jH^F') + _0x4609df(0x776, 'dxeI'),
                'wSJMx': function (_0x4c92b9, _0x52204b) {
                    return _0x4c92b9 === _0x52204b;
                },
                'eyzrZ': _0x4609df(0x9bc, 'jH^F') + _0x4609df(0xa16, 'aUOA') + _0x4609df(0x477, 'Gz#P'),
                'cFySt': function (_0xe5ca75, _0x32dc2e) {
                    return _0xe5ca75 === _0x32dc2e;
                },
                'oAHHn': _0x4609df(0x80b, 'Kh1Y') + _0x4609df(0xa9c, 'Dzp9'),
                'Kiugx': function (_0x4e8630, _0x2f2986) {
                    return _0x4e8630 === _0x2f2986;
                },
                'FHszs': _0x4609df(0x2b5, 'ZS%t') + _0x4609df(0x2ac, 'sOIM'),
                'oXrfA': _0x4609df(0x695, 'IXWX'),
                'QYCJO': _0x4609df(0xa64, 'Dzp9') + _0x4609df(0x385, '[qEW'),
                'sttXH': _0x4609df(0x40d, '[qEW'),
                'iqSuv': 'FWsFX',
                'bKrlu': _0x4609df(0x3d7, 'W#(8') + 'p',
                'UkyeR': _0x4609df(0x8a2, 'aUOA'),
                'LzgBD': _0x4609df(0x788, 'pk&V'),
                'qBNJl': _0x4609df(0x62d, 'Fpez'),
                'jAUJP': _0x4609df(0x9bd, 'W#(8'),
                'aNxko': _0x4609df(0x62f, 'bI!F'),
                'PgcJy': _0x4609df(0xa53, '))Nx'),
                'dNwvH': _0x4609df(0x784, 'sOIM'),
                'sdecG': 'cuddle',
                'ziXBu': 'pat',
                'Fxbsr': _0x4609df(0x636, 'jobK'),
                'VbCVw': _0x4609df(0x5b5, 'eo]Y'),
                'uvkYm': _0x4609df(0x373, 'ih4U'),
                'sqHWh': _0x4609df(0x73e, 'Fpez'),
                'OAOFo': _0x4609df(0x538, 'XnfP'),
                'dyCoj': _0x4609df(0x9e4, 'XzzT'),
                'gCYwD': _0x4609df(0x450, '3Ek4'),
                'Jewzy': 'blush',
                'PSKWU': _0x4609df(0x472, 'eo]Y'),
                'qAbyJ': _0x4609df(0x9fb, 'VbOS'),
                'ABRBF': _0x4609df(0x93c, 'dxeI'),
                'eNnAP': _0x4609df(0x637, 'rNL@'),
                'PSsoA': _0x4609df(0x38a, '!$R8'),
                'rbZcV': _0x4609df(0x5fe, 'fr)d'),
                'qLVlv': _0x4609df(0x2a2, 'y7P]'),
                'eBOQI': _0x4609df(0x858, '6#U$'),
                'RXRfe': function (_0x19d100, _0x3754b6) {
                    return _0x19d100 === _0x3754b6;
                },
                'fzOXG': 'reaction_r' + _0x4609df(0x237, 'Kh1Y'),
                'PNiKt': _0x4609df(0x79d, 'B9Tk'),
                'BBqgn': _0x4609df(0x6a3, 'cl&d') + _0x4609df(0x359, ')Vmg'),
                'QhIHa': 'reactions',
                'INCml': _0x4609df(0x72b, 'Z&DW'),
                'PvtlD': function (_0x1e33aa, _0x3414d2) {
                    return _0x1e33aa === _0x3414d2;
                },
                'dyREU': _0x4609df(0x6ff, 'bI!F'),
                'fIncj': _0x4609df(0xa36, 'K%s%'),
                'nZkLS': _0x4609df(0x959, 'eo]Y'),
                'voqob': _0x4609df(0x325, 'Yhq6') + 'gos',
                'oWQrm': _0x4609df(0x5fd, 'jobK'),
                'iWXnI': _0x4609df(0x26f, 'qyfM'),
                'smiwd': function (_0xd934b0, _0x10b690) {
                    return _0xd934b0 === _0x10b690;
                },
                'TqLEz': function (_0x23fa1b, _0x270f9b) {
                    return _0x23fa1b + _0x270f9b;
                },
                'hhXbb': function (_0x28b1b0, _0x4c542d) {
                    return _0x28b1b0 + _0x4c542d;
                },
                'uiZdD': function (_0x5cd7f9, _0x411288) {
                    return _0x5cd7f9 + _0x411288;
                },
                'KHGFq': function (_0x393a0b, _0x3bfe93) {
                    return _0x393a0b + _0x3bfe93;
                },
                'bwbUx': function (_0x972b15, _0x1864d5) {
                    return _0x972b15 + _0x1864d5;
                },
                'MhMpd': function (_0x313b64, _0x37d31f) {
                    return _0x313b64 + _0x37d31f;
                },
                'beGWd': function (_0x1a2837, _0x408026) {
                    return _0x1a2837 + _0x408026;
                },
                'gJXVT': function (_0x3e490e, _0x5298ff) {
                    return _0x3e490e + _0x5298ff;
                },
                'RJLtE': function (_0x584a39, _0xe571ee) {
                    return _0x584a39 + _0xe571ee;
                },
                'SxMRx': function (_0x5970eb, _0x9e9c65) {
                    return _0x5970eb + _0x9e9c65;
                },
                'YqqUq': function (_0x35365e, _0x57378d) {
                    return _0x35365e + _0x57378d;
                },
                'DLjkK': function (_0x750c70, _0x2440b0) {
                    return _0x750c70 === _0x2440b0;
                },
                'BXrfs': _0x4609df(0x3e9, '3Ek4') + 'te',
                'LViXN': function (_0x261462, _0x175b62) {
                    return _0x261462 + _0x175b62;
                },
                'LhZRP': function (_0x2eb9bc, _0x35659c) {
                    return _0x2eb9bc + _0x35659c;
                },
                'BaXSA': function (_0x3acd53, _0x460e81) {
                    return _0x3acd53 + _0x460e81;
                },
                'umALr': function (_0xa49053, _0x57ef6a) {
                    return _0xa49053 + _0x57ef6a;
                },
                'oDPKy': _0x4609df(0x8f2, 'O@hb') + 'al',
                'QxuES': _0x4609df(0x703, 'pk&V'),
                'NEJfF': _0x4609df(0x497, '8*C0'),
                'yLQxc': _0x4609df(0x560, 'jobK') + _0x4609df(0x509, 'ZS%t'),
                'zAcQt': _0x4609df(0x255, 'Dzp9') + 's',
                'KWNLt': _0x4609df(0x3fd, 'Dzp9'),
                'fuDqk': _0x4609df(0x555, 'bI!F') + 'ology',
                'rWOyO': _0x4609df(0x262, 'Yhq6'),
                'HrPgB': function (_0x3e655f, _0x4495a2) {
                    return _0x3e655f === _0x4495a2;
                },
                'akSHw': _0x4609df(0x8cc, 'sOIM') + _0x4609df(0x536, '))Nx'),
                'jXeLv': _0x4609df(0x3fe, 'Yhq6'),
                'dLdYA': _0x4609df(0x721, 'cl&d') + _0x4609df(0xaa7, 'pk&V'),
                'kHILy': function (_0x37d235, _0x53c6b2, _0x18d519, _0x5291f6, _0x513ad4) {
                    return _0x37d235(_0x53c6b2, _0x18d519, _0x5291f6, _0x513ad4);
                },
                'lGgnU': _0x4609df(0x33c, 'bI!F') + _0x4609df(0x4bc, 'ih4U'),
                'NgENM': _0x4609df(0x81e, '!$R8') + _0x4609df(0x30b, 'O@hb'),
                'uiliW': _0x4609df(0x6c8, 'rNL@') + _0x4609df(0x2ec, ')Vmg'),
                'nCQVy': 'sticker_cr' + 'op',
                'ugsFA': '--crop',
                'CrFJH': _0x4609df(0x26e, '!6eZ'),
                'XrYJO': _0x4609df(0x4ee, 'Pk!v'),
                'EUKrl': function (_0x197f57, _0x5e2262) {
                    return _0x197f57 === _0x5e2262;
                },
                'ByvHq': _0x4609df(0xabb, 'Yhq6'),
                'aZErH': _0x4609df(0x44e, 'B9Tk') + 'io',
                'tDFLT': function (_0xef52dd, _0xb9b3e6) {
                    return _0xef52dd === _0xb9b3e6;
                },
                'AtiDK': _0x4609df(0x7d9, 'O@hb'),
                'FXfuV': _0x4609df(0x800, 'jobK'),
                'eObvI': _0x4609df(0x7c6, 'ih4U') + _0x4609df(0x581, 'sOIM'),
                'WymJW': function (_0x88104a, _0x451771) {
                    return _0x88104a === _0x451771;
                },
                'rFhpJ': _0x4609df(0x9c4, 'rNL@'),
                'OdHMQ': function (_0xeb9168, _0x310651) {
                    return _0xeb9168 === _0x310651;
                },
                'bMAaw': _0x4609df(0x482, 'jH^F'),
                'vlCPg': _0x4609df(0x227, '@Ss8') + _0x4609df(0x542, '@Ss8'),
                'eSKkQ': _0x4609df(0x339, 'Kh1Y'),
                'njuOW': function (_0x14898c, _0x16851) {
                    return _0x14898c === _0x16851;
                },
                'gPOPE': _0x4609df(0x406, 'bI!F'),
                'HKDOZ': function (_0x2b1490, _0x217d37) {
                    return _0x2b1490 === _0x217d37;
                },
                'mhYxJ': function (_0x3c4765, _0x4c1bef) {
                    return _0x3c4765 === _0x4c1bef;
                },
                'qvGvx': _0x4609df(0x311, 'ih4U') + 'p',
                'nseUF': function (_0x48b335, _0x225158) {
                    return _0x48b335 + _0x225158;
                },
                'nZiej': function (_0xa3838d, _0xfa0a6b) {
                    return _0xa3838d + _0xfa0a6b;
                },
                'SNzfD': function (_0x5a43e4, _0x305a32) {
                    return _0x5a43e4 + _0x305a32;
                },
                'KOCHg': function (_0x47c5cc, _0x218740) {
                    return _0x47c5cc + _0x218740;
                },
                'vIpnu': function (_0x18a258, _0x53ac0c) {
                    return _0x18a258 + _0x53ac0c;
                },
                'yTRAh': function (_0x44a8c5, _0x4b36bf) {
                    return _0x44a8c5 + _0x4b36bf;
                },
                'Eynri': function (_0x49c0f7, _0x51d7bb) {
                    return _0x49c0f7 + _0x51d7bb;
                },
                'bMqcT': function (_0x10418e, _0x23c082) {
                    return _0x10418e + _0x23c082;
                },
                'YsqIF': function (_0x1174c0, _0x2f603c) {
                    return _0x1174c0 === _0x2f603c;
                },
                'yEaWv': _0x4609df(0x7e0, 'fr)d') + _0x4609df(0x615, 'Dzp9'),
                'MhTCr': _0x4609df(0x709, 'hKmO') + '/deleteall' + _0x4609df(0x515, 'jH^F'),
                'YkwyP': function (_0x4f2719, _0x89cdb6, _0x112764, _0x5beb9d) {
                    return _0x4f2719(_0x89cdb6, _0x112764, _0x5beb9d);
                },
                'BZGbi': _0x4609df(0x89b, '))Nx') + _0x4609df(0x558, 'IXWX'),
                'IQlpt': function (_0x16b252, _0x391a44) {
                    return _0x16b252 === _0x391a44;
                },
                'TEGgR': function (_0x37775c, _0x4efa0f) {
                    return _0x37775c + _0x4efa0f;
                },
                'TZYwM': function (_0xdbb450, _0x5b1b92) {
                    return _0xdbb450 + _0x5b1b92;
                },
                'BfRKJ': function (_0x3b94a4, _0x54ebb4) {
                    return _0x3b94a4 + _0x54ebb4;
                },
                'lYYJV': function (_0x3eb55f, _0xa7baeb) {
                    return _0x3eb55f + _0xa7baeb;
                },
                'WoPhB': function (_0x52ed23, _0xbca42b) {
                    return _0x52ed23 + _0xbca42b;
                },
                'nylIz': function (_0x26cb6e, _0x530019) {
                    return _0x26cb6e + _0x530019;
                },
                'xUgSf': _0x4609df(0x467, '[qEW'),
                'VEGNt': function (_0x3762b1, _0x254d09) {
                    return _0x3762b1 === _0x254d09;
                },
                'XQmJt': 'ping_list',
                'rpLHs': 'list',
                'WMmww': function (_0x5769bc, _0xaf0bbd) {
                    return _0x5769bc === _0xaf0bbd;
                },
                'FCuvl': _0x4609df(0x304, '!6eZ'),
                'VhKNH': function (_0x13aafb, _0x2f3ffd) {
                    return _0x13aafb === _0x2f3ffd;
                },
                'PoDJc': _0x4609df(0x1f6, 'XzzT'),
                'exzPc': _0x4609df(0x3e6, 'B9Tk'),
                'cHcbM': function (_0x2d993b, _0x51a4e8) {
                    return _0x2d993b === _0x51a4e8;
                },
                'wnYfh': 'hidetag',
                'oUsQs': function (_0x183a3a, _0x5d00fa) {
                    return _0x183a3a === _0x5d00fa;
                },
                'GaeMY': _0x4609df(0x824, 'eCWM'),
                'rOzin': _0x4609df(0x9a1, 'Gz#P'),
                'YQbiB': function (_0x2bd30d, _0x55f0f0) {
                    return _0x2bd30d(_0x55f0f0);
                },
                'yhrjJ': _0x4609df(0x8ca, '8*C0') + _0x4609df(0xa12, 'hKmO') + _0x4609df(0x4c2, 'eCWM'),
                'lzddw': function (_0x53871e, _0x315ae1, _0x27cfb8, _0x35252b, _0xbe944f, _0x2a87c3, _0xa53009) {
                    return _0x53871e(_0x315ae1, _0x27cfb8, _0x35252b, _0xbe944f, _0x2a87c3, _0xa53009);
                },
                'NJOOi': _0x4609df(0xa61, 'IXWX') + '_',
                'llZOy': _0x4609df(0x666, 'Gz#P'),
                'GGrij': 'accept',
                'IXOOL': _0x4609df(0x39e, '!6eZ') + '_',
                'nbZIs': _0x4609df(0x2dd, 'Fpez'),
                'wvXSc': function (_0x30dc4b, _0x447b7f) {
                    return _0x30dc4b === _0x447b7f;
                },
                'xcVqi': _0x4609df(0x791, 'sOIM'),
                'QiVxu': function (_0x5b966a, _0x422d15) {
                    return _0x5b966a === _0x422d15;
                },
                'pUTgy': _0x4609df(0x51e, 'hKmO'),
                'LyeTt': function (_0x5425ea, _0x42ee5e) {
                    return _0x5425ea === _0x42ee5e;
                },
                'YEeuO': _0x4609df(0x9ba, 'VYw$'),
                'KlDth': function (_0x470c99, _0x6d1a24) {
                    return _0x470c99 === _0x6d1a24;
                },
                'YARKB': _0x4609df(0x975, '[dUU') + 'f',
                'GVtEJ': function (_0x2d9b84, _0x5cdcd8) {
                    return _0x2d9b84 === _0x5cdcd8;
                },
                'SGZCn': 'goodbye_on',
                'Warrn': _0x4609df(0x978, 'XzzT'),
                'AWlxQ': _0x4609df(0x221, 'ih4U') + 'f',
                'sPDWs': function (_0x27f92b, _0x33db50) {
                    return _0x27f92b === _0x33db50;
                },
                'SLztS': _0x4609df(0x45b, 'pk&V'),
                'ZctEu': _0x4609df(0x45e, 'v!iA'),
                'YGURt': function (_0x1c0f45, _0x3f36b2) {
                    return _0x1c0f45 === _0x3f36b2;
                },
                'zaFqJ': 'reject',
                'oDWAo': _0x4609df(0x521, '[qEW'),
                'iKKDk': 'autobio',
                'CYRuq': function (_0x16df51, _0x4b40f1) {
                    return _0x16df51 === _0x4b40f1;
                },
                'RVScx': 'public',
                'LRBdk': function (_0x146c0d, _0x67684b) {
                    return _0x146c0d === _0x67684b;
                },
                'lIWoV': _0x4609df(0x700, 'Pk!v') + 'te',
                'gydyP': 'mode',
                'ohcbc': _0x4609df(0x8b2, '!$R8'),
                'XxNKy': 'ai_clear',
                'LPOHF': _0x4609df(0x330, 'eo]Y'),
                'cGILw': _0x4609df(0x9ca, '6#U$')
            }, _0xc2232c = _0x58f163[_0x4609df(0x3d5, 'K%s%')]?.[_0x4609df(0x1ff, 'Z&DW') + _0x4609df(0x58b, 'W#(8') + 'ge'];
        if (!_0xc2232c)
            return ![];
        const _0xd64220 = _0xc2232c[_0x4609df(0x876, 'Yhq6') + _0x4609df(0x82f, 'y7P]')], _0x5cd8a5 = _0x58f163['key'][_0x4609df(0x30c, '[AjO')];
        console[_0x4609df(0x1f3, '@Ss8')](_0x4609df(0x9e5, 'pk&V') + _0x4609df(0x8fa, 'eCWM') + _0xd64220);
        if (_0x49f3f1[_0x4609df(0x977, 'K%s%')](_0xd64220, _0x49f3f1[_0x4609df(0x2f8, 'jH^F')])) {
            if (_0x4609df(0x680, 'jobK') === _0x49f3f1[_0x4609df(0xa68, 'Pk!v')])
                _0x378a89[_0x4609df(0x2ba, 'Kh1Y')](oODODO[_0x4609df(0x36a, 'Kh1Y')], _0x305824);
            else {
                const _0x36d32e = commands[_0x4609df(0x3a9, '[qEW')](_0x49f3f1[_0x4609df(0x56b, 'NOkJ')]);
                if (_0x36d32e)
                    await _0x36d32e[_0x4609df(0x86f, 'jobK')](_0x3fb2ce, _0x58f163, [], _0x1f6eb4);
                return !![];
            }
        }
        if (_0xd64220 === 'menu_gener' + 'al')
            return await _0x3fb2ce[_0x4609df(0x7dd, '@Ss8') + 'e'](_0x5cd8a5, { 'text': _0x49f3f1[_0x4609df(0x81f, 'pk&V')](_0x49f3f1[_0x4609df(0x31e, '))Nx')](_0x49f3f1[_0x4609df(0x696, 'IXWX')](_0x49f3f1['wbSjq'](_0x49f3f1[_0x4609df(0x530, 'W#(8')](_0x49f3f1[_0x4609df(0x283, 'jobK')](_0x49f3f1[_0x4609df(0x5d1, 'B9Tk')](_0x49f3f1['aZQZX'](_0x49f3f1[_0x4609df(0x9c2, 'y7P]')](_0x49f3f1['TfhBx'](_0x49f3f1[_0x4609df(0x891, 'fr)d')](_0x49f3f1[_0x4609df(0x3f7, 'O@hb')](_0x49f3f1[_0x4609df(0xa8a, '%iYw')](_0x49f3f1[_0x4609df(0x524, 'ih4U')](_0x49f3f1[_0x4609df(0x376, 'eCWM')](_0x49f3f1[_0x4609df(0x31e, '))Nx')](_0x49f3f1['tTWHj'](_0x49f3f1[_0x4609df(0x73d, 'cl&d')](_0x4609df(0x97a, '9M@a') + _0x4609df(0x393, 'Fpez') + _0x4609df(0x29a, 'Fpez') + (_0x4609df(0x43e, '@Ss8') + _0x4609df(0x792, 'sOIM')), '┃\x0a'), _0x4609df(0x95a, 'Gz#P') + _0x4609df(0x828, 'ZS%t') + '\x0a'), _0x4609df(0x8ad, 'sOIM') + '-\x20Check\x20bo' + 't\x20response' + _0x4609df(0x25b, 'Fpez')), '┃\x20├\x20.uptim' + _0x4609df(0x4fe, 'VbOS') + _0x4609df(0x3b8, '6#U$')), _0x4609df(0x7b2, 'bI!F') + _0x4609df(0x98d, 'rNL@') + _0x4609df(0x556, 'y7P]')), _0x4609df(0xa41, '!6eZ') + _0x4609df(0x678, 'IXWX') + 'file\x20pictu' + _0x4609df(0x2a9, 'Yhq6')) + (_0x4609df(0x2fd, '!$R8') + '\x20-\x20Set\x20pro' + _0x4609df(0x300, '[qEW') + _0x4609df(0x7bd, 'VX^@')) + ('┃\x20├\x20.vcf\x20-' + _0x4609df(0x845, 'Pk!v') + _0x4609df(0x75d, 'qyfM') + _0x4609df(0x29e, 'VX^@')) + ('┃\x20├\x20.total' + 'members\x20-\x20' + _0x4609df(0x64a, 'B9Tk') + 'er\x20count\x0a'), _0x4609df(0x579, 'sOIM') + _0x4609df(0x770, 'NOkJ') + _0x4609df(0xa7b, 'jH^F') + _0x4609df(0x508, 'cl&d')) + '┃\x0a', _0x4609df(0x8b7, 'B9Tk') + _0x4609df(0x46e, '[dUU')), _0x4609df(0x70b, '!6eZ') + _0x4609df(0x39b, 'rNL@') + _0x4609df(0xa89, 'eCWM')), '┃\x20├\x20.news\x20' + _0x4609df(0x35a, 'pk&V') + _0x4609df(0x4b9, 'fr)d')), _0x4609df(0x890, 'IXWX') + _0x4609df(0x4fb, 'Kh1Y') + 'tball\x20scor' + _0x4609df(0x322, 'Yhq6')), _0x4609df(0x360, 'IXWX') + _0x4609df(0x480, 'qyfM') + _0x4609df(0x599, 'Z&DW')) + (_0x4609df(0x5c9, 'jobK') + _0x4609df(0x519, 'jobK') + _0x4609df(0xa9b, 'hKmO') + 'code\x0a') + (_0x4609df(0x996, 'ZS%t') + _0x4609df(0x33d, 'Fpez') + _0x4609df(0x36c, 'dxeI') + _0x4609df(0x96b, 'Gz#P')), '┃\x0a'), _0x4609df(0x399, 'rNL@') + _0x4609df(0x930, '[dUU')), _0x4609df(0x213, '[AjO') + '\x20-\x20Bible\x20v' + _0x4609df(0x86a, '[dUU')), _0x4609df(0x6b6, 'qyfM') + _0x4609df(0x2d2, 'VX^@') + 'erse\x0a') + '┃\x0a', _0x4609df(0x2cd, 'ih4U') + _0x4609df(0x65b, '[AjO') + '━━╯\x0a\x0a'), _0x4609df(0x7fc, 'B9Tk') + _0x4609df(0x28f, '[dUU') + '\x20⚡') }, { 'quoted': _0x58f163 }), !![];
        if (_0x49f3f1['ZrCHH'](_0xd64220, _0x49f3f1[_0x4609df(0x4e7, 'eo]Y')]))
            return await _0x3fb2ce[_0x4609df(0x479, 'y7P]') + 'e'](_0x5cd8a5, { 'text': _0x49f3f1[_0x4609df(0x231, 'ZS%t')](_0x49f3f1['aZQZX'](_0x49f3f1[_0x4609df(0x90f, 'Fpez')](_0x49f3f1[_0x4609df(0xa3e, 'Z&DW')](_0x49f3f1[_0x4609df(0x76d, 'Dzp9')](_0x49f3f1[_0x4609df(0x737, 'eo]Y')](_0x49f3f1[_0x4609df(0x745, 'VbOS')](_0x49f3f1[_0x4609df(0x924, 'W#(8')](_0x49f3f1[_0x4609df(0x7e5, '3Ek4')](_0x49f3f1[_0x4609df(0x655, 'W#(8')](_0x49f3f1[_0x4609df(0x6a4, 'B9Tk')](_0x49f3f1[_0x4609df(0x394, ')Vmg')](_0x49f3f1[_0x4609df(0x2ab, 'v!iA')](_0x49f3f1['FbwIB'](_0x49f3f1[_0x4609df(0x468, '(49)')](_0x49f3f1[_0x4609df(0x5af, '%iYw')](_0x4609df(0x5df, 'W#(8') + _0x4609df(0x9db, '(49)') + _0x4609df(0xa11, '[AjO'), _0x4609df(0x7ca, 'v!iA') + _0x4609df(0x7c9, '3Ek4')), '┃\x0a'), _0x4609df(0x958, 'Yhq6') + _0x4609df(0x286, 'Dzp9')), _0x4609df(0x6a1, 'K%s%') + _0x4609df(0x98e, '9M@a') + _0x4609df(0x2b4, 'dxeI') + _0x4609df(0x2b9, '8*C0') + _0x4609df(0x39d, 'jobK')) + (_0x4609df(0x365, 'B9Tk') + 'ink\x20action' + _0x4609df(0x5de, 'y7P]') + _0x4609df(0x9b6, '9M@a')), _0x4609df(0x7d2, 'NOkJ') + _0x4609df(0x9f2, 'VbOS') + _0x4609df(0x2fa, 'pk&V') + _0x4609df(0x273, '[dUU') + 's\x0a'), _0x4609df(0x79f, 'jobK') + _0x4609df(0x3d3, 'qyfM') + _0x4609df(0x285, 'O@hb') + 'te/kick\x0a') + (_0x4609df(0x7fa, 'rNL@') + _0x4609df(0x24b, 'W#(8') + _0x4609df(0x58d, '[AjO') + _0x4609df(0x729, 'ZS%t') + _0x4609df(0x514, '8*C0')), _0x4609df(0x7cd, '@Ss8') + _0x4609df(0x949, 'v!iA') + _0x4609df(0x222, 'VbOS') + _0x4609df(0x5f3, 'cl&d') + 'up\x20mention' + 's\x0a'), _0x4609df(0x736, 'eCWM') + _0x4609df(0x595, '8*C0') + _0x4609df(0x6e0, '[qEW') + _0x4609df(0x82b, 'K%s%') + '\x0a'), _0x4609df(0x4cc, '!6eZ') + _0x4609df(0x3d6, '3Ek4') + _0x4609df(0x64e, '!6eZ') + _0x4609df(0x42d, 'O@hb')), '┃\x0a'), '┃\x20📌\x20*Group' + _0x4609df(0x693, '(49)')), _0x4609df(0x591, 'dxeI') + _0x4609df(0x6b7, 'W#(8') + _0x4609df(0x8c0, '%iYw') + _0x4609df(0x5c0, 'fr)d')), _0x4609df(0x88b, 'eCWM') + _0x4609df(0x226, 'hKmO') + _0x4609df(0xa0f, 'Z&DW') + _0x4609df(0x31b, '@Ss8')), _0x4609df(0x46b, 'Fpez') + _0x4609df(0x224, 'Z&DW') + _0x4609df(0x2e5, 'aUOA')), '┃\x0a'), _0x4609df(0xa24, 'fr)d') + '━━━━━━━━━━' + _0x4609df(0x878, 'y7P]')) + (_0x4609df(0x7fc, 'B9Tk') + _0x4609df(0x734, 'y7P]') + '\x20⚡') }, { 'quoted': _0x58f163 }), !![];
        if (_0x49f3f1[_0x4609df(0x561, 'rNL@')](_0xd64220, _0x49f3f1[_0x4609df(0x816, 'eCWM')]))
            return await _0x3fb2ce[_0x4609df(0x7ce, '3Ek4') + 'e'](_0x5cd8a5, { 'text': _0x49f3f1[_0x4609df(0x733, 'ZS%t')](_0x49f3f1[_0x4609df(0x326, 'NOkJ')](_0x49f3f1[_0x4609df(0x9d9, 'Kh1Y')](_0x49f3f1[_0x4609df(0x912, 'aUOA')](_0x49f3f1[_0x4609df(0x50f, '[qEW')](_0x49f3f1[_0x4609df(0x548, '8*C0')](_0x49f3f1[_0x4609df(0x90e, 'Dzp9')](_0x49f3f1['yXVMT'](_0x49f3f1[_0x4609df(0x632, 'pk&V')](_0x49f3f1[_0x4609df(0x803, 'v!iA')](_0x49f3f1[_0x4609df(0x8d4, '[AjO')](_0x49f3f1[_0x4609df(0xa98, '%iYw')](_0x49f3f1[_0x4609df(0x922, 'fr)d')]('📥\x20*ＤＯＷＮＬＯＡ' + _0x4609df(0x4ec, 'K%s%') + _0x4609df(0x36b, 'y7P]'), _0x4609df(0x793, '[qEW') + _0x4609df(0x418, 'cl&d')), '┃\x0a'), _0x4609df(0x99f, '9M@a') + _0x4609df(0x74a, '[dUU')) + (_0x4609df(0xa80, '!6eZ') + _0x4609df(0x4c8, 'v!iA') + _0x4609df(0x80d, 'Yhq6') + _0x4609df(0x55e, 'dxeI') + 'oad\x0a'), _0x4609df(0x2aa, 'y7P]') + _0x4609df(0x763, 'B9Tk') + '-\x20Facebook' + _0x4609df(0x6d4, 'Pk!v')) + (_0x4609df(0x4c4, 'Kh1Y') + _0x4609df(0x778, 'O@hb') + _0x4609df(0x3c7, '!6eZ') + _0x4609df(0x274, 'VX^@')), _0x4609df(0x753, 'jobK') + _0x4609df(0x2bd, 'y7P]') + _0x4609df(0x49d, '6#U$') + _0x4609df(0x5da, 'ih4U')) + '┃\x0a', _0x4609df(0x904, 'jH^F') + _0x4609df(0x4b3, 'bI!F')), '┃\x20├\x20.play\x20' + '/\x20.song\x20-\x20' + _0x4609df(0x852, '%iYw') + _0x4609df(0x37d, '(49)') + _0x4609df(0x617, '%iYw')) + (_0x4609df(0x452, 'Z&DW') + '--audio\x20-\x20' + _0x4609df(0x384, '%iYw') + '\x0a') + (_0x4609df(0x77d, '6#U$') + 'eo\x20-\x20YouTu' + _0x4609df(0x463, '!$R8') + _0x4609df(0x80f, 'ih4U')), '┃\x0a'), _0x4609df(0x229, 'jH^F') + _0x4609df(0x23e, 'rNL@')) + (_0x4609df(0x979, 'O@hb') + _0x4609df(0x946, 'jobK') + _0x4609df(0x681, 'jH^F') + _0x4609df(0x8de, 'sOIM')) + (_0x4609df(0x205, '9M@a') + _0x4609df(0x465, 'B9Tk') + _0x4609df(0x44d, '))Nx')) + (_0x4609df(0x4b1, '3Ek4') + _0x4609df(0x944, '6#U$') + _0x4609df(0x981, 'eCWM') + 't\x0a'), _0x4609df(0x5e0, '9M@a') + _0x4609df(0x3e4, 'B9Tk') + _0x4609df(0x5e4, '!$R8')), '┃\x20├\x20.toima' + _0x4609df(0x244, 'W#(8') + _0x4609df(0x314, 'Z&DW') + _0x4609df(0x1f5, 'sOIM')) + (_0x4609df(0x58c, 'dxeI') + _0x4609df(0x8c8, 'Z&DW') + _0x4609df(0x992, 'IXWX') + _0x4609df(0x355, 'fr)d')) + (_0x4609df(0x4d8, ')Vmg') + _0x4609df(0x998, 'NOkJ') + _0x4609df(0x9fa, 'Z&DW') + '\x0a'), '┃\x0a'), '╰━━━━━━━━━' + _0x4609df(0x329, 'Fpez') + _0x4609df(0x48f, 'B9Tk')) + (_0x4609df(0x208, 'O@hb') + _0x4609df(0x4af, 'cl&d') + '\x20⚡') }, { 'quoted': _0x58f163 }), !![];
        if (_0xd64220 === _0x4609df(0x813, '[qEW') + 'el') {
            if (_0x49f3f1['PqWRU'](_0x49f3f1['dIgFw'], _0x49f3f1['nEWoy'])) {
                const _0xb9086c = _0x49f3f1['cjYOw'], _0x571e24 = _0x4609df(0x25a, 'Pk!v') + _0x4609df(0x22c, 'B9Tk') + _0x4609df(0x96f, 'Yhq6') + _0x4609df(0x3e0, '%iYw') + _0x4609df(0x4aa, 'Pk!v') + _0x4609df(0x885, '(49)');
                return await _0x3fb2ce[_0x4609df(0x47d, 'v!iA') + 'e'](_0x5cd8a5, {
                    'text': _0x49f3f1[_0x4609df(0x26b, 'jobK')](_0x49f3f1[_0x4609df(0xa8c, 'eCWM')](_0x49f3f1[_0x4609df(0x531, '3Ek4')](_0x49f3f1[_0x4609df(0x962, 'K%s%')](_0x49f3f1['hDWGu'](_0x49f3f1[_0x4609df(0x9a2, '[AjO')](_0x49f3f1[_0x4609df(0x656, 'Pk!v')](_0x49f3f1[_0x4609df(0x874, '!6eZ')](_0x49f3f1[_0x4609df(0x324, 'eo]Y')](_0x49f3f1[_0x4609df(0xa59, 'hKmO')](_0x49f3f1[_0x4609df(0x20e, 'NOkJ')](_0x49f3f1[_0x4609df(0xa05, 'Yhq6')](_0x49f3f1[_0x4609df(0x271, 'aUOA')](_0x4609df(0x200, 'bI!F') + _0x4609df(0x3b3, '[AjO') + _0x4609df(0x220, '[qEW') + _0x4609df(0x448, 'qyfM'), _0x4609df(0x87c, '[dUU') + _0x4609df(0x3c4, 'eo]Y')) + '┃\x0a' + (_0x4609df(0x490, 'VX^@') + 'ated\x20with\x20' + 'the\x20latest' + _0x4609df(0x57a, 'sOIM')) + (_0x4609df(0x4ca, 'Kh1Y') + _0x4609df(0x466, 'XzzT') + _0x4609df(0x7a6, 'Gz#P') + '\x0a'), '┃\x0a'), _0x4609df(0x3c0, '8*C0') + _0x4609df(0x7d4, '))Nx')), '┃\x20' + _0x571e24 + '\x0a'), '┃\x0a'), _0x4609df(0x2b1, '!6eZ') + _0x4609df(0x35e, 'v!iA')) + ('┃\x20' + _0xb9086c + '\x0a'), '┃\x0a'), _0x4609df(0x2d5, '3Ek4') + _0x4609df(0x254, 'Kh1Y')) + ('┃\x20✓\x20Latest' + _0x4609df(0x7ac, 'XzzT') + _0x4609df(0x758, 'Gz#P')) + (_0x4609df(0x624, '[qEW') + _0x4609df(0x9e8, '3Ek4') + _0x4609df(0x30f, '8*C0')), _0x4609df(0x57e, 'aUOA') + _0x4609df(0x6eb, 'sOIM') + 'cements\x0a'), '┃\x0a'), '╰━━━━━━━━━' + _0x4609df(0x46c, 'ih4U') + _0x4609df(0x715, 'NOkJ')), _0x4609df(0x738, '9M@a') + 'nk\x20above\x20t' + _0x4609df(0x9a5, '[qEW') + '\x0a'), _0x4609df(0x62e, '!6eZ') + _0x4609df(0xa6a, '!$R8') + '\x20⚡'),
                    'contextInfo': {
                        'mentionedJid': [],
                        'forwardingScore': 0x0,
                        'isForwarded': ![],
                        'newsletterJid': _0xb9086c,
                        'newsletterName': _0x49f3f1[_0x4609df(0x4d5, '[dUU')]
                    }
                }, { 'quoted': _0x58f163 }), !![];
            } else
                _0x5a0049[_0x4609df(0xa58, 'B9Tk')](oODODO['ilYzw'], _0x291332);
        }
        if (_0x49f3f1[_0x4609df(0x3f2, 'v!iA')](_0xd64220, _0x49f3f1[_0x4609df(0x91d, 'VbOS')]))
            return await _0x3fb2ce[_0x4609df(0x6bf, 'Dzp9') + 'e'](_0x5cd8a5, { 'text': _0x49f3f1['tTWHj'](_0x49f3f1['jsHAi'](_0x49f3f1[_0x4609df(0x550, 'dxeI')](_0x49f3f1['TfhBx'](_0x49f3f1[_0x4609df(0x84c, 'qyfM')](_0x49f3f1['zsdpB'](_0x49f3f1['aZQZX'](_0x49f3f1[_0x4609df(0x836, 'Gz#P')](_0x49f3f1[_0x4609df(0x5dd, 'aUOA')](_0x49f3f1[_0x4609df(0x45f, 'cl&d')](_0x49f3f1[_0x4609df(0x6e4, 'ZS%t')](_0x49f3f1[_0x4609df(0x4dc, 'aUOA')](_0x49f3f1[_0x4609df(0x719, 'Yhq6')](_0x49f3f1[_0x4609df(0x783, 'v!iA')](_0x49f3f1[_0x4609df(0x92f, '[dUU')](_0x49f3f1[_0x4609df(0x9b0, 'v!iA')](_0x49f3f1[_0x4609df(0x343, 'aUOA')](_0x49f3f1[_0x4609df(0x3e7, 'eo]Y')](_0x49f3f1['SQXTS'](_0x49f3f1[_0x4609df(0x487, 'VYw$')](_0x49f3f1['wbSjq'](_0x49f3f1[_0x4609df(0x77b, 'Fpez')](_0x49f3f1['FbwIB'](_0x4609df(0x289, 'aUOA') + _0x4609df(0x4f5, 'pk&V') + _0x4609df(0x584, '))Nx'), _0x4609df(0x6de, 'y7P]') + _0x4609df(0x950, 'K%s%')), '┃\x0a') + (_0x4609df(0x6d6, 'XnfP') + _0x4609df(0x3a7, 'XnfP')), _0x4609df(0x45c, '%iYw') + '@user\x20-\x20Sl' + _0x4609df(0x3e5, '[qEW') + '\x0a'), _0x4609df(0xa43, 'Gz#P') + _0x4609df(0x41a, 'Dzp9') + 'unch\x20someo' + 'ne\x0a'), '┃\x20├\x20.hug\x20@' + 'user\x20-\x20Hug' + '\x20someone\x0a'), _0x4609df(0x963, '(49)') + _0x4609df(0x363, '@Ss8') + _0x4609df(0x28e, 'O@hb') + '\x0a'), _0x4609df(0x59e, 'bI!F') + _0x4609df(0x97c, 'Dzp9') + _0x4609df(0xa17, 'sOIM') + _0x4609df(0x6a0, 'K%s%')) + (_0x4609df(0x395, '[dUU') + '@user\x20-\x20Ki' + _0x4609df(0x3b9, '!6eZ') + '\x0a'), _0x4609df(0x9cf, 'jH^F') + 'e\x20@user\x20-\x20' + _0x4609df(0x2d3, 'fr)d') + 'eone\x0a'), _0x4609df(0x3c3, '))Nx') + _0x4609df(0x4de, 'hKmO') + _0x4609df(0x976, '[qEW')), _0x4609df(0x25c, 'Z&DW') + _0x4609df(0x585, '!6eZ') + 'te\x20someone' + '\x0a'), _0x4609df(0xaad, 'dxeI') + _0x4609df(0x445, '))Nx') + _0x4609df(0x892, 'dxeI') + '\x0a'), _0x4609df(0x3ed, '@Ss8') + _0x4609df(0x528, 'Kh1Y') + _0x4609df(0x9a0, '%iYw') + '\x0a'), '┃\x0a') + (_0x4609df(0x431, 'v!iA') + 'ssions*\x0a') + (_0x4609df(0x8b1, 'IXWX') + _0x4609df(0xab3, '6#U$') + '-\x20High\x20fiv' + 'e\x0a') + (_0x4609df(0x704, 'NOkJ') + _0x4609df(0x8c4, 'Pk!v') + _0x4609df(0x779, 'v!iA')) + (_0x4609df(0x7e3, '9M@a') + '\x20-\x20Shrug\x0a') + (_0x4609df(0x201, 'y7P]') + '-\x20Applaud\x0a'), _0x4609df(0x486, 'XnfP') + _0x4609df(0x713, '3Ek4') + _0x4609df(0x440, 'v!iA')), '┃\x20├\x20.blush' + '\x20-\x20Blush\x0a'), _0x4609df(0x4bd, 'Dzp9') + _0x4609df(0xa84, 'jobK') + 'nd\x20love\x0a'), _0x4609df(0x77f, 'VYw$') + _0x4609df(0x8a7, 'NOkJ')), _0x4609df(0x572, 'eo]Y') + _0x4609df(0xa10, 'ih4U')), _0x4609df(0x84d, '[AjO') + '\x20-\x20Dance\x0a'), '┃\x0a'), _0x4609df(0x84a, 'hKmO') + '\x20.reaction' + _0x4609df(0x307, 'ih4U')) + (_0x4609df(0x857, 'rNL@') + _0x4609df(0x8df, 'pk&V')) + '┃\x0a', _0x4609df(0x613, 'Z&DW') + _0x4609df(0x63a, '3Ek4') + _0x4609df(0x375, 'rNL@')), _0x4609df(0x5ef, 'sOIM') + _0x4609df(0x290, 'rNL@') + '\x20⚡') }, { 'quoted': _0x58f163 }), !![];
        if (_0x49f3f1[_0x4609df(0x245, 'Gz#P')](_0xd64220, _0x49f3f1['qOilx'])) {
            if (_0x49f3f1[_0x4609df(0x35c, 'NOkJ')](_0x4609df(0x252, 'NOkJ'), _0x49f3f1[_0x4609df(0x916, '%iYw')]))
                return await _0x3fb2ce[_0x4609df(0x4ed, 'VX^@') + 'e'](_0x5cd8a5, { 'text': _0x49f3f1['tTWHj'](_0x49f3f1[_0x4609df(0x935, 'O@hb')](_0x49f3f1[_0x4609df(0x576, '[AjO')](_0x49f3f1['jsHAi'](_0x49f3f1[_0x4609df(0xa5a, '%iYw')](_0x49f3f1['HcJiA'](_0x49f3f1[_0x4609df(0x9f6, 'eo]Y')](_0x49f3f1[_0x4609df(0x61f, 'dxeI')](_0x49f3f1[_0x4609df(0x511, 'XnfP')](_0x49f3f1[_0x4609df(0x8ef, 'VX^@')](_0x4609df(0x40c, 'eo]Y') + _0x4609df(0x4ef, 'ih4U') + _0x4609df(0x59f, '[dUU') + (_0x4609df(0x796, 'Kh1Y') + _0x4609df(0x849, '%iYw')), '┃\x0a') + (_0x4609df(0x260, 'B9Tk') + _0x4609df(0x9fe, 'Gz#P') + '\x0a'), _0x4609df(0x475, 'Pk!v') + '\x20-\x20Random\x20' + 'Bible\x20vers' + 'e\x0a'), _0x4609df(0x907, '@Ss8') + _0x4609df(0x40a, 'hKmO') + '\x20-\x20Specifi' + _0x4609df(0xa0a, 'y7P]')), _0x4609df(0x48e, 'jH^F') + _0x4609df(0x38c, 'ih4U') + _0x4609df(0x8c2, '3Ek4') + _0x4609df(0x6d2, '9M@a')), _0x4609df(0x2e9, '))Nx') + _0x4609df(0x97d, 'Fpez') + _0x4609df(0x987, 'VbOS') + _0x4609df(0x46a, '8*C0')) + (_0x4609df(0x423, 'bI!F') + '\x20--kjv\x20-\x20K' + _0x4609df(0x872, 'NOkJ') + 'Version\x0a'), _0x4609df(0x68d, 'Pk!v') + _0x4609df(0x772, 'v!iA') + _0x4609df(0x36f, 'bI!F') + 'sh\x20Bible\x0a'), '┃\x0a'), _0x4609df(0x409, ')Vmg') + _0x4609df(0x552, 'eo]Y') + '\x0a') + (_0x4609df(0x532, '[dUU') + '\x20-\x20Random\x20' + 'Quran\x20vers' + 'e\x0a') + (_0x4609df(0x377, 'VX^@') + '\x20random\x20-\x20' + _0x4609df(0x240, '!$R8')), '┃\x0a') + (_0x4609df(0x650, '[dUU') + _0x4609df(0x918, 'VbOS') + _0x4609df(0x2b6, 'Pk!v')), _0x4609df(0x3e3, 'W#(8') + _0x4609df(0x32c, 'XnfP') + '\x20⚡') }, { 'quoted': _0x58f163 }), !![];
            else {
                const _0x2838e1 = _0x2d6075['key'][_0x4609df(0xa4d, 'jobK') + 't'] || _0x229120[_0x4609df(0xa85, 'VX^@')][_0x4609df(0x9d5, 'VX^@')];
                _0x4bfb94[_0x4609df(0xa01, '(49)')](_0xf705a6[_0x4609df(0x882, '[dUU')]['id'], {
                    'sender': _0x2838e1,
                    'content': _0x36847b[_0x4609df(0x2bb, 'v!iA')](0x0, 0x1f4),
                    'timestamp': _0x266383[_0x4609df(0x3c6, 'XzzT')](),
                    'messageType': _0x2626af
                });
                const _0x2b50b0 = _0xd5cba6[_0x4609df(0x8d9, 'Kh1Y')]();
                for (const [_0x56d99e, _0x1c4977] of _0x460fb7[_0x4609df(0x504, 'Z&DW')]()) {
                    oODODO[_0x4609df(0x547, 'ZS%t')](oODODO[_0x4609df(0x661, '[dUU')](_0x2b50b0, _0x1c4977['timestamp']), _0x1913d0) && _0x4d03b6[_0x4609df(0x4a6, '6#U$')](_0x56d99e);
                }
            }
        }
        if (_0x49f3f1[_0x4609df(0x8ed, '%iYw')](_0xd64220, _0x4609df(0x7bf, 'dxeI')))
            return await _0x3fb2ce[_0x4609df(0xa0c, '))Nx') + 'e'](_0x5cd8a5, { 'text': _0x49f3f1[_0x4609df(0x716, 'sOIM')](_0x49f3f1[_0x4609df(0x3a2, '(49)')](_0x49f3f1[_0x4609df(0x9f8, 'B9Tk')](_0x49f3f1['ZNnBX'](_0x49f3f1[_0x4609df(0x2c7, 'sOIM')](_0x49f3f1[_0x4609df(0xa76, '))Nx')](_0x49f3f1['tmRju'](_0x49f3f1[_0x4609df(0x3cb, 'Z&DW')](_0x49f3f1[_0x4609df(0x931, 'fr)d')](_0x49f3f1[_0x4609df(0x69f, 'B9Tk')](_0x49f3f1['lqptg'](_0x49f3f1[_0x4609df(0x247, 'hKmO')](_0x49f3f1[_0x4609df(0x7bb, 'W#(8')](_0x49f3f1[_0x4609df(0x926, '[AjO')](_0x49f3f1['KEdlw'](_0x49f3f1[_0x4609df(0x382, 'qyfM')](_0x4609df(0x52f, 'XnfP') + _0x4609df(0x5b7, 'cl&d') + _0x4609df(0x529, '9M@a'), '╭━━━❲\x20ᴢᴜᴋᴏ' + '\x20ᴍᴅ\x20❳━━━╮\x0a'), '┃\x0a') + (_0x4609df(0x5c3, 'XzzT') + _0x4609df(0x275, 'eo]Y') + _0x4609df(0x7b3, 'eCWM')), _0x4609df(0x1fe, 'v!iA') + _0x4609df(0x37f, 'B9Tk') + 'move\x20membe' + 'r\x0a'), _0x4609df(0x76c, 'VX^@') + _0x4609df(0x27b, 'Kh1Y') + _0x4609df(0xa3c, 'Pk!v') + _0x4609df(0x27e, 'Z&DW')) + (_0x4609df(0x79b, 'NOkJ') + _0x4609df(0x670, 'Kh1Y') + '\x20Make\x20admi' + 'n\x0a'), _0x4609df(0x358, 'ZS%t') + _0x4609df(0x4d7, '[qEW') + _0x4609df(0x522, 'XnfP') + _0x4609df(0x771, '%iYw')), _0x4609df(0x7cf, 'W#(8') + _0x4609df(0x30d, 'hKmO') + _0x4609df(0x6df, 'fr)d') + _0x4609df(0x37e, 'Z&DW')) + (_0x4609df(0x8b6, 'W#(8') + _0x4609df(0x905, 'jobK') + _0x4609df(0x997, 'Fpez') + 'only\x0a') + '┃\x0a', _0x4609df(0x78e, 'VX^@') + _0x4609df(0x2da, '[dUU') + '\x0a'), '┃\x20├\x20.setna' + _0x4609df(0x9ee, 'VX^@') + _0x4609df(0x8f7, 'rNL@') + _0x4609df(0xa13, 'bI!F')) + (_0x4609df(0x7d3, 'W#(8') + _0x4609df(0x36d, ')Vmg') + _0x4609df(0xa1b, '@Ss8') + 'escription' + '\x0a'), _0x4609df(0x3b6, 'rNL@') + _0x4609df(0x639, 'bI!F') + '\x20group\x20ico' + 'n\x0a'), '┃\x20├\x20.welco' + 'me\x20on/off\x20' + _0x4609df(0xa09, 'y7P]') + _0x4609df(0x2e6, 'IXWX')) + ('┃\x20├\x20.welco' + _0x4609df(0x67f, 'eo]Y') + _0x4609df(0x844, 'XzzT') + 'm\x20welcome\x0a') + ('┃\x20├\x20.goodb' + _0x4609df(0x481, 'VX^@') + _0x4609df(0x4e4, 'O@hb') + _0x4609df(0x8a8, 'VX^@')), '┃\x20└\x20.goodb' + 'ye\x20set\x20<ms' + _0x4609df(0x65e, 'aUOA') + _0x4609df(0x90c, 'IXWX')), '┃\x0a'), _0x4609df(0x69b, ')Vmg') + _0x4609df(0xa40, 'VbOS')) + (_0x4609df(0x6aa, '!6eZ') + _0x4609df(0x2f2, 'jH^F') + _0x4609df(0x841, 'bI!F')) + ('┃\x20├\x20.appro' + _0x4609df(0x48d, 'pk&V') + _0x4609df(0x3bb, 'ih4U')), _0x4609df(0x589, 'VbOS') + _0x4609df(0x3a4, 'VbOS') + _0x4609df(0x7c4, '6#U$')), '┃\x0a'), '╰━━━━━━━━━' + _0x4609df(0x269, 'XnfP') + '━━╯\x0a\x0a') + (_0x4609df(0x21d, 'NOkJ') + _0x4609df(0x7e1, 'Dzp9') + '\x20⚡') }, { 'quoted': _0x58f163 }), !![];
        if (_0x49f3f1[_0x4609df(0x9de, '6#U$')](_0xd64220, _0x49f3f1[_0x4609df(0x6ec, 'W#(8')]))
            return await _0x3fb2ce[_0x4609df(0x757, 'IXWX') + 'e'](_0x5cd8a5, { 'text': _0x49f3f1[_0x4609df(0x5bf, 'NOkJ')](_0x49f3f1[_0x4609df(0xa38, 'VYw$')](_0x49f3f1[_0x4609df(0x741, 'eo]Y')](_0x49f3f1[_0x4609df(0x426, 'v!iA')](_0x49f3f1['fQqoF'](_0x49f3f1[_0x4609df(0x7fb, 'eCWM')](_0x49f3f1[_0x4609df(0xa8b, '6#U$')](_0x49f3f1[_0x4609df(0x7d8, 'Kh1Y')](_0x49f3f1[_0x4609df(0x644, 'Fpez')](_0x49f3f1[_0x4609df(0x5f2, 'XzzT')](_0x49f3f1[_0x4609df(0x70e, 'O@hb')](_0x49f3f1[_0x4609df(0x725, 'B9Tk')](_0x49f3f1[_0x4609df(0x41c, 'K%s%')](_0x49f3f1[_0x4609df(0x564, 'aUOA')](_0x49f3f1[_0x4609df(0x55c, 'K%s%')](_0x4609df(0x92b, 'bI!F') + _0x4609df(0x75f, 'VX^@') + ('╭━━━❲\x20ᴢᴜᴋᴏ' + _0x4609df(0x2a5, '))Nx')), '┃\x0a'), _0x4609df(0x2e4, 'eCWM') + _0x4609df(0x668, 'v!iA')), _0x4609df(0x82c, 'fr)d') + _0x4609df(0xab6, '6#U$') + _0x4609df(0x60c, '8*C0') + _0x4609df(0x4c6, 'v!iA')), _0x4609df(0x9a8, '!6eZ') + _0x4609df(0x54c, 'Pk!v') + _0x4609df(0x77e, 'aUOA') + _0x4609df(0x317, '8*C0')), _0x4609df(0x7c1, 'VbOS') + _0x4609df(0x27f, 'Dzp9') + _0x4609df(0x2db, 'XzzT')) + (_0x4609df(0x9c9, '9M@a') + _0x4609df(0x66e, 'Dzp9') + _0x4609df(0x347, 'aUOA')), _0x4609df(0x225, '%iYw') + _0x4609df(0x6fc, 'dxeI') + _0x4609df(0x762, 'NOkJ')), '┃\x0a'), _0x4609df(0x4f1, 'B9Tk') + 'g\x20Soon:*\x0a'), _0x4609df(0x22a, 'ih4U') + _0x4609df(0x6f5, '))Nx') + 'ors\x0a'), '┃\x20•\x20Trivia' + _0x4609df(0x3df, 'Fpez')), _0x4609df(0x7b6, 'hKmO') + '\x20Guessing\x0a'), _0x4609df(0x59c, '!$R8') + _0x4609df(0x3a8, 'Pk!v')), '┃\x0a'), _0x4609df(0x3fb, 'v!iA') + _0x4609df(0x478, '%iYw') + '━━╯\x0a\x0a'), '⚡\x20ᴘᴏᴡᴇʀᴇᴅ\x20' + _0x4609df(0xa00, 'v!iA') + '\x20⚡') }, { 'quoted': _0x58f163 }), !![];
        if (_0x49f3f1['IIGVL'](_0xd64220, _0x49f3f1[_0x4609df(0x3bf, 'Pk!v')])) {
            if (_0x49f3f1[_0x4609df(0x888, 'qyfM')] !== _0x49f3f1[_0x4609df(0x34a, 'VbOS')])
                return await _0x3fb2ce[_0x4609df(0x20d, 'NOkJ') + 'e'](_0x5cd8a5, { 'text': _0x49f3f1['WaRkg'](_0x49f3f1['Kyftr'](_0x49f3f1[_0x4609df(0x489, 'W#(8')](_0x49f3f1[_0x4609df(0x829, '9M@a')](_0x49f3f1[_0x4609df(0x83a, 'XnfP')](_0x49f3f1[_0x4609df(0x94a, 'Z&DW')](_0x49f3f1['piFsK'](_0x49f3f1[_0x4609df(0x2f0, '[AjO')](_0x49f3f1['wbSjq'](_0x49f3f1['fwFDx'](_0x49f3f1['xmFFd'](_0x49f3f1[_0x4609df(0x367, 'Gz#P')](_0x49f3f1[_0x4609df(0x2c0, 'rNL@')](_0x49f3f1[_0x4609df(0x809, 'VX^@')](_0x49f3f1[_0x4609df(0x2ce, 'eo]Y')](_0x49f3f1['GvEXY'](_0x49f3f1['ZzdUD'](_0x4609df(0x759, 'hKmO') + _0x4609df(0x8e3, 'rNL@') + '\x0a\x0a', _0x4609df(0x52d, 'B9Tk') + _0x4609df(0x33a, 'aUOA')) + '┃\x0a', _0x4609df(0x575, '!$R8') + _0x4609df(0x8da, '[AjO') + '\x0a'), _0x4609df(0x881, 'VX^@') + _0x4609df(0x569, 'sOIM') + _0x4609df(0x217, 'XzzT') + 'ate\x20about\x0a'), _0x4609df(0x371, 'hKmO') + _0x4609df(0x801, '[AjO') + _0x4609df(0x43c, 'qyfM') + _0x4609df(0x877, 'VbOS')) + (_0x4609df(0x37a, 'jH^F') + 'io\x20set\x20<te' + _0x4609df(0x7bc, 'O@hb') + 'om\x20about\x0a') + (_0x4609df(0x80e, 'v!iA') + _0x4609df(0x65f, 'B9Tk') + _0x4609df(0xa30, 'jH^F') + _0x4609df(0x5f5, '))Nx') + _0x4609df(0x4b0, '9M@a')), _0x4609df(0x5a3, 'rNL@') + _0x4609df(0x8db, 'Gz#P') + _0x4609df(0x607, 'Fpez') + _0x4609df(0x41e, 'dxeI')), _0x4609df(0x6ea, 'Fpez') + _0x4609df(0x5e7, 'dxeI') + _0x4609df(0x6be, 'Fpez') + _0x4609df(0x8c9, 'Gz#P')), _0x4609df(0x60f, 'O@hb') + _0x4609df(0x8a0, '3Ek4') + _0x4609df(0x7b9, '3Ek4') + _0x4609df(0x545, 'v!iA')), _0x4609df(0x2e7, 'hKmO') + _0x4609df(0x302, '!$R8') + _0x4609df(0x350, 'eCWM') + 'eact\x20to\x20me' + _0x4609df(0x61b, 'pk&V')), _0x4609df(0xa0e, '[AjO') + _0x4609df(0x6ef, '3Ek4') + _0x4609df(0xa3b, '[AjO') + _0x4609df(0x80c, 'Gz#P') + _0x4609df(0x32d, 'Pk!v')) + (_0x4609df(0x23b, 'O@hb') + _0x4609df(0x1f8, 'B9Tk') + '\x20media\x20as\x20' + _0x4609df(0x63b, 'VX^@')), _0x4609df(0x9b8, 'Z&DW') + _0x4609df(0x63f, '))Nx') + _0x4609df(0x900, 'Fpez') + _0x4609df(0x518, 'B9Tk') + '\x0a'), '┃\x0a') + (_0x4609df(0x953, 'jobK') + _0x4609df(0x608, 'Fpez')), _0x4609df(0x982, 'NOkJ') + _0x4609df(0x351, 'B9Tk') + _0x4609df(0x308, 'bI!F')), _0x4609df(0x7b2, 'bI!F') + _0x4609df(0xa7d, 'VYw$') + _0x4609df(0x911, 'fr)d') + _0x4609df(0xabc, 'ih4U')), _0x4609df(0x20a, '!$R8') + _0x4609df(0x257, 'Kh1Y') + _0x4609df(0x6cd, '[dUU')), '┃\x0a'), _0x4609df(0x66c, 'aUOA') + _0x4609df(0x253, 'qyfM') + _0x4609df(0x375, 'rNL@')), _0x4609df(0x72a, 'v!iA') + _0x4609df(0x573, '%iYw') + '\x20⚡') }, { 'quoted': _0x58f163 }), !![];
            else
                _0x2568ef[_0x4609df(0x53c, 'jobK')](oODODO[_0x4609df(0xa81, 'jobK')], _0x3d9ea2);
        }
        if (_0xd64220 === _0x49f3f1['zlHTP']) {
            const _0x4186f3 = commands[_0x4609df(0x786, '8*C0')](_0x4609df(0x4eb, 'jH^F'));
            if (_0x4186f3)
                await _0x4186f3[_0x4609df(0x5a8, 'cl&d')](_0x3fb2ce, _0x58f163, ['on'], _0x1f6eb4);
            return !![];
        }
        if (_0x49f3f1[_0x4609df(0xa62, '%iYw')](_0xd64220, _0x49f3f1[_0x4609df(0x361, '8*C0')])) {
            if (_0x49f3f1[_0x4609df(0xa4a, '(49)')](_0x49f3f1['DvcwC'], _0x49f3f1[_0x4609df(0x989, 'Gz#P')])) {
                const _0x2ed260 = commands[_0x4609df(0x2a3, 'pk&V')](_0x4609df(0x398, 'sOIM'));
                if (_0x2ed260)
                    await _0x2ed260[_0x4609df(0x8e0, 'Dzp9')](_0x3fb2ce, _0x58f163, [_0x49f3f1[_0x4609df(0x8a9, 'Kh1Y')]], _0x1f6eb4);
                return !![];
            } else
                _0x73427d[_0x4609df(0xa5c, '8*C0')](oODODO[_0x4609df(0x807, 'bI!F')], _0x24c175);
        }
        if (_0x49f3f1[_0x4609df(0x641, 'IXWX')](_0xd64220, _0x49f3f1[_0x4609df(0x246, 'cl&d')])) {
            if (_0x49f3f1[_0x4609df(0x211, 'jH^F')](_0x49f3f1[_0x4609df(0x9dc, 'aUOA')], _0x49f3f1[_0x4609df(0x9c6, 'fr)d')])) {
                const _0x357649 = commands['get'](_0x49f3f1[_0x4609df(0x5ed, '[AjO')]);
                if (_0x357649)
                    await _0x357649['execute'](_0x3fb2ce, _0x58f163, ['settings'], _0x1f6eb4);
                return !![];
            } else
                _0x4598ac = '[Document]' + '\x20' + (_0x1d06ff[_0x4609df(0x267, 'O@hb') + _0x4609df(0x4a3, 'sOIM')][_0x4609df(0x232, '))Nx')] || _0x4609df(0xa2d, 'O@hb')), _0x308001 = _0x4609df(0x507, 'K%s%') + _0x4609df(0x30e, 'ih4U');
        }
        if (_0xd64220 === 'antilink_a' + _0x4609df(0x71e, 'Dzp9') + 'te') {
            if (_0x49f3f1[_0x4609df(0x6d5, 'Dzp9')] !== _0x49f3f1['mgCpw']) {
                const _0x5f315d = commands['get'](_0x49f3f1[_0x4609df(0xa3d, 'bI!F')]);
                if (_0x5f315d)
                    await _0x5f315d[_0x4609df(0x3ad, 'Pk!v')](_0x3fb2ce, _0x58f163, [
                        _0x49f3f1[_0x4609df(0x820, 'VX^@')],
                        _0x49f3f1[_0x4609df(0x2ee, 'VX^@')]
                    ], _0x1f6eb4);
                return !![];
            } else
                _0x41edd6 = _0x4609df(0x1ed, '[qEW') + _0x4609df(0x8c6, 'Kh1Y') + _0x59255f[_0x4609df(0x2e2, 'fr)d') + _0x4609df(0x840, 'Gz#P') + 'ge'][_0x4609df(0x9c8, '3Ek4') + _0x4609df(0x6ce, '[AjO')] + ']', _0x347c3e = _0x4609df(0x5c2, 'sOIM') + _0x4609df(0x53f, 'eCWM') + 'ge';
        }
        if (_0xd64220 === _0x49f3f1[_0x4609df(0xab7, '@Ss8')]) {
            const _0x46586f = commands['get'](_0x49f3f1[_0x4609df(0x9f9, 'K%s%')]);
            if (_0x46586f)
                await _0x46586f[_0x4609df(0x822, 'qyfM')](_0x3fb2ce, _0x58f163, [
                    _0x49f3f1[_0x4609df(0x7a3, 'fr)d')],
                    _0x49f3f1[_0x4609df(0x838, 'hKmO')]
                ], _0x1f6eb4);
            return !![];
        }
        if (_0x49f3f1['jDenR'](_0xd64220, _0x4609df(0x785, 'fr)d'))) {
            const _0x376706 = commands[_0x4609df(0x9c7, '%iYw')](_0x49f3f1[_0x4609df(0x833, 'XzzT')]);
            if (_0x376706)
                await _0x376706[_0x4609df(0x9d2, ')Vmg')](_0x3fb2ce, _0x58f163, ['on'], _0x1f6eb4);
            return !![];
        }
        if (_0x49f3f1[_0x4609df(0x9ad, 'jobK')](_0xd64220, _0x49f3f1[_0x4609df(0x85f, '9M@a')])) {
            if (_0x49f3f1[_0x4609df(0x574, '8*C0')](_0x49f3f1['vpCTv'], _0x4609df(0x9f5, 'eCWM')))
                return _0x3bba96[_0x4609df(0x3f4, 'Gz#P')](_0x230dff), _0x25a598['size'] === 0x0 && _0x763240[_0x4609df(0x234, 'qyfM')](_0xc6abf2), ![];
            else {
                const _0x1a4ece = commands[_0x4609df(0xa21, '3Ek4')](_0x49f3f1[_0x4609df(0x5d0, 'hKmO')]);
                if (_0x1a4ece)
                    await _0x1a4ece[_0x4609df(0x567, 'ZS%t')](_0x3fb2ce, _0x58f163, [_0x49f3f1[_0x4609df(0x299, 'jH^F')]], _0x1f6eb4);
                return !![];
            }
        }
        if (_0x49f3f1[_0x4609df(0x5ce, '9M@a')](_0xd64220, _0x49f3f1['vSZMq'])) {
            if (_0x49f3f1[_0x4609df(0x1f1, '(49)')](_0x4609df(0x9a4, 'NOkJ'), _0x49f3f1['OECco'])) {
                const _0x289e23 = _0x27df5d(_0x4e3b1f[_0x4609df(0x56d, '6#U$')]('@') ? _0x931d53 : _0x1f2236 + (_0x4609df(0x60e, '))Nx') + _0x4609df(0x8ee, '))Nx')));
                return oODODO['ZrCHH'](_0x289e23, _0x4f5e09);
            } else {
                const _0x1df0f2 = commands[_0x4609df(0x439, 'Fpez')](_0x49f3f1[_0x4609df(0x464, 'qyfM')]);
                if (_0x1df0f2)
                    await _0x1df0f2[_0x4609df(0x822, 'qyfM')](_0x3fb2ce, _0x58f163, [_0x49f3f1[_0x4609df(0x2ca, 'bI!F')]], _0x1f6eb4);
                return !![];
            }
        }
        if (_0x49f3f1[_0x4609df(0x642, 'IXWX')](_0xd64220, _0x49f3f1[_0x4609df(0x732, 'jobK')])) {
            const _0x23def1 = commands['get'](_0x49f3f1[_0x4609df(0x86c, 'y7P]')]);
            if (_0x23def1)
                await _0x23def1['execute'](_0x3fb2ce, _0x58f163, [
                    _0x49f3f1[_0x4609df(0x6b4, 'XzzT')],
                    _0x49f3f1[_0x4609df(0x334, '(49)')]
                ], _0x1f6eb4);
            return !![];
        }
        if (_0x49f3f1[_0x4609df(0xab4, 'eCWM')](_0xd64220, _0x4609df(0x3ca, 'IXWX') + _0x4609df(0x970, 'Fpez'))) {
            if (_0x49f3f1[_0x4609df(0x8f0, 'cl&d')] === _0x49f3f1[_0x4609df(0x619, '%iYw')]) {
                const _0x41a0a7 = commands[_0x4609df(0x3a9, '[qEW')]('antitag');
                if (_0x41a0a7)
                    await _0x41a0a7[_0x4609df(0x295, 'eCWM')](_0x3fb2ce, _0x58f163, [
                        _0x49f3f1[_0x4609df(0x7a1, '[AjO')],
                        _0x49f3f1[_0x4609df(0x597, '8*C0')]
                    ], _0x1f6eb4);
                return !![];
            } else
                _0x36fedb = _0x12120a[_0x4609df(0x537, 'Dzp9') + _0x4609df(0x9cb, '@Ss8')][_0x4609df(0x5d2, '))Nx')] || '';
        }
        if (_0x49f3f1[_0x4609df(0x26c, 'bI!F')](_0xd64220, _0x49f3f1[_0x4609df(0x61e, 'eo]Y')])) {
            const _0x554abb = commands[_0x4609df(0x896, 'qyfM')](_0x49f3f1[_0x4609df(0x2d6, '(49)')]);
            if (_0x554abb)
                await _0x554abb['execute'](_0x3fb2ce, _0x58f163, ['on'], _0x1f6eb4);
            return !![];
        }
        if (_0x49f3f1[_0x4609df(0xa15, 'pk&V')](_0xd64220, _0x49f3f1[_0x4609df(0x694, '%iYw')])) {
            const _0x5bebf4 = commands['get'](_0x49f3f1[_0x4609df(0x2d6, '(49)')]);
            if (_0x5bebf4)
                await _0x5bebf4[_0x4609df(0x927, 'v!iA')](_0x3fb2ce, _0x58f163, [_0x4609df(0x683, 'dxeI')], _0x1f6eb4);
            return !![];
        }
        if (_0x49f3f1[_0x4609df(0x59d, 'W#(8')](_0xd64220, _0x49f3f1[_0x4609df(0x364, ')Vmg')])) {
            if (_0x49f3f1['BlFbN'](_0x4609df(0x658, '6#U$'), _0x4609df(0x80a, '!$R8')))
                _0x323644 = _0x5cc14d[_0x4609df(0x46d, 'cl&d') + 'ge'][_0x4609df(0x3db, 'jH^F')] || '';
            else {
                const _0x2af815 = commands[_0x4609df(0x7f8, 'hKmO')]('antisticke' + 'r');
                if (_0x2af815)
                    await _0x2af815[_0x4609df(0x86f, 'jobK')](_0x3fb2ce, _0x58f163, [_0x49f3f1[_0x4609df(0x22b, 'rNL@')]], _0x1f6eb4);
                return !![];
            }
        }
        if (_0x49f3f1[_0x4609df(0x9de, '6#U$')](_0xd64220, _0x49f3f1[_0x4609df(0x4cd, '!$R8')])) {
            const _0x3f1df8 = commands['get'](_0x49f3f1[_0x4609df(0x3af, '))Nx')]);
            if (_0x3f1df8)
                await _0x3f1df8['execute'](_0x3fb2ce, _0x58f163, ['on'], _0x1f6eb4);
            return !![];
        }
        if (_0xd64220 === _0x4609df(0x39f, '!6eZ') + _0x4609df(0xa51, 'IXWX')) {
            if (_0x49f3f1[_0x4609df(0x3d8, 'cl&d')](_0x4609df(0x751, 'hKmO'), _0x49f3f1[_0x4609df(0x473, 'ih4U')])) {
                const _0x3fc9e9 = commands[_0x4609df(0xa21, '3Ek4')](_0x49f3f1[_0x4609df(0x8b5, '!$R8')]);
                if (_0x3fc9e9)
                    await _0x3fc9e9['execute'](_0x3fb2ce, _0x58f163, [_0x49f3f1[_0x4609df(0x645, '6#U$')]], _0x1f6eb4);
                return !![];
            } else
                _0x5c2dd5[_0x4609df(0x91c, '!6eZ')](_0x2f8718);
        }
        if (_0x49f3f1[_0x4609df(0x3c1, 'v!iA')](_0xd64220, 'antigroupm' + _0x4609df(0x48a, 'O@hb') + _0x4609df(0x95b, 'Dzp9'))) {
            if (_0x49f3f1[_0x4609df(0x574, '8*C0')](_0x49f3f1[_0x4609df(0x7a8, '3Ek4')], _0x49f3f1[_0x4609df(0x8d3, '%iYw')]))
                return ![];
            else {
                const _0x219167 = commands[_0x4609df(0x559, 'eo]Y')](_0x4609df(0x6b5, 'sOIM') + _0x4609df(0x731, '(49)'));
                if (_0x219167)
                    await _0x219167[_0x4609df(0x5a2, 'ih4U')](_0x3fb2ce, _0x58f163, [_0x49f3f1[_0x4609df(0xaa1, 'Z&DW')]], _0x1f6eb4);
                return !![];
            }
        }
        if (_0xd64220 === _0x49f3f1[_0x4609df(0xa39, 'y7P]')]) {
            const _0x1e9d56 = commands[_0x4609df(0x4c0, 'VbOS')](_0x49f3f1[_0x4609df(0x29f, '3Ek4')]);
            if (_0x1e9d56)
                await _0x1e9d56[_0x4609df(0x983, 'eo]Y')](_0x3fb2ce, _0x58f163, [
                    _0x49f3f1[_0x4609df(0x4b7, 'v!iA')],
                    _0x49f3f1[_0x4609df(0x669, 'XzzT')]
                ], _0x1f6eb4);
            return !![];
        }
        if (_0x49f3f1[_0x4609df(0x389, 'cl&d')](_0xd64220, _0x49f3f1[_0x4609df(0x686, 'y7P]')])) {
            const _0x637d60 = commands[_0x4609df(0x2d4, 'O@hb')](_0x49f3f1[_0x4609df(0x4a7, 'aUOA')]);
            if (_0x637d60)
                await _0x637d60[_0x4609df(0x3ad, 'Pk!v')](_0x3fb2ce, _0x58f163, [
                    _0x49f3f1[_0x4609df(0x4b7, 'v!iA')],
                    _0x49f3f1[_0x4609df(0x9ef, '!$R8')]
                ], _0x1f6eb4);
            return !![];
        }
        if (_0x49f3f1['cFySt'](_0xd64220, _0x49f3f1['oAHHn'])) {
            const _0x154d3d = commands[_0x4609df(0x7a4, 'Yhq6')](_0x4609df(0x42a, 'VX^@'));
            if (_0x154d3d)
                await _0x154d3d['execute'](_0x3fb2ce, _0x58f163, ['on'], _0x1f6eb4);
            return !![];
        }
        if (_0x49f3f1[_0x4609df(0x3d0, 'XnfP')](_0xd64220, _0x49f3f1[_0x4609df(0x87d, 'eo]Y')])) {
            const _0x9bd564 = commands[_0x4609df(0x453, 'VX^@')](_0x49f3f1['oXrfA']);
            if (_0x9bd564)
                await _0x9bd564[_0x4609df(0x543, 'Kh1Y')](_0x3fb2ce, _0x58f163, [_0x49f3f1[_0x4609df(0x422, '[qEW')]], _0x1f6eb4);
            return !![];
        }
        if (_0x49f3f1['SaOSg'](_0xd64220, _0x49f3f1[_0x4609df(0xa50, 'jH^F')])) {
            const _0x5d0b9f = commands[_0x4609df(0x68c, 'XzzT')](_0x4609df(0x206, 'B9Tk'));
            if (_0x5d0b9f)
                await _0x5d0b9f[_0x4609df(0x822, 'qyfM')](_0x3fb2ce, _0x58f163, [_0x49f3f1[_0x4609df(0x97b, 'Kh1Y')]], _0x1f6eb4);
            return !![];
        }
        if (_0xd64220 === _0x49f3f1['sttXH']) {
            if (_0x49f3f1[_0x4609df(0x675, '))Nx')](_0x49f3f1['iqSuv'], _0x4609df(0x588, '6#U$')))
                _0x47b8ee = _0x4609df(0x7b5, 'NOkJ'), _0x28e689 = oODODO[_0x4609df(0x4e3, 'VX^@')];
            else {
                const _0x35ec34 = commands[_0x4609df(0x559, 'eo]Y')]('getpp');
                if (_0x35ec34)
                    await _0x35ec34[_0x4609df(0x875, '))Nx')](_0x3fb2ce, _0x58f163, [], _0x1f6eb4);
                return !![];
            }
        }
        if (_0x49f3f1[_0x4609df(0x8cd, '@Ss8')](_0xd64220, _0x49f3f1['bKrlu'])) {
            const _0x577319 = commands[_0x4609df(0x99e, 'B9Tk')](_0x49f3f1[_0x4609df(0x306, 'XzzT')]);
            if (_0x577319)
                await _0x577319[_0x4609df(0x9e0, '6#U$')](_0x3fb2ce, _0x58f163, [_0x49f3f1[_0x4609df(0x942, '8*C0')]], _0x1f6eb4);
            return !![];
        }
        if (_0xd64220 === _0x4609df(0x40f, 'jH^F')) {
            if (_0x49f3f1[_0x4609df(0x861, 'VYw$')] === _0x4609df(0x727, 'dxeI')) {
                const _0x32b8fb = commands[_0x4609df(0x961, 'Dzp9')](_0x4609df(0x9fd, 'aUOA'));
                if (_0x32b8fb)
                    await _0x32b8fb[_0x4609df(0x4f6, '9M@a')](_0x3fb2ce, _0x58f163, [], _0x1f6eb4);
                return !![];
            } else
                _0x20d530[_0x4609df(0x5c7, 'VX^@')](oODODO[_0x4609df(0x72f, '[qEW')], _0xc15a99);
        }
        if (_0xd64220 === _0x4609df(0x8f5, 'y7P]') + 'p') {
            if (_0x49f3f1['qBNJl'] !== _0x49f3f1[_0x4609df(0x5c1, 'bI!F')])
                _0x3c57d3 = oODODO[_0x4609df(0x55f, 'bI!F')], _0xfa81e4 = oODODO[_0x4609df(0x27d, 'B9Tk')];
            else {
                const _0xcd0d1f = commands['get'](_0x49f3f1['jAUJP']);
                if (_0xcd0d1f)
                    await _0xcd0d1f[_0x4609df(0x28b, 'Yhq6')](_0x3fb2ce, _0x58f163, [_0x49f3f1[_0x4609df(0x1ec, 'W#(8')]], _0x1f6eb4);
                return !![];
            }
        }
        const _0x7b69b2 = [
            _0x4609df(0x89f, 'v!iA'),
            _0x4609df(0x52a, 'rNL@'),
            _0x4609df(0x49b, 'eCWM'),
            _0x49f3f1[_0x4609df(0x5be, '%iYw')],
            _0x49f3f1[_0x4609df(0x832, 'fr)d')],
            _0x49f3f1[_0x4609df(0x4a8, 'IXWX')],
            _0x49f3f1['sdecG'],
            _0x49f3f1['ziXBu'],
            _0x4609df(0x679, 'y7P]'),
            _0x49f3f1['FBuMq'],
            _0x49f3f1[_0x4609df(0x805, '6#U$')],
            _0x49f3f1[_0x4609df(0x291, 'ih4U')],
            _0x49f3f1[_0x4609df(0x89d, '@Ss8')],
            _0x49f3f1[_0x4609df(0x287, 'Pk!v')],
            _0x49f3f1[_0x4609df(0x503, 'VX^@')],
            _0x49f3f1['dyCoj'],
            _0x49f3f1[_0x4609df(0x66d, 'aUOA')],
            _0x49f3f1[_0x4609df(0x1f7, 'ZS%t')],
            _0x49f3f1['PSKWU'],
            'cool',
            _0x4609df(0x471, 'Dzp9'),
            _0x49f3f1[_0x4609df(0xa69, 'fr)d')],
            _0x49f3f1[_0x4609df(0x71b, '!$R8')],
            _0x4609df(0xa46, '[dUU'),
            _0x49f3f1[_0x4609df(0x296, 'VX^@')],
            _0x49f3f1[_0x4609df(0x8f9, '[qEW')],
            'nervous',
            _0x49f3f1[_0x4609df(0x424, 'VYw$')],
            _0x4609df(0x70a, '!$R8'),
            _0x4609df(0x814, 'XnfP'),
            _0x49f3f1[_0x4609df(0x461, 'ZS%t')],
            _0x49f3f1[_0x4609df(0x8f6, 'eCWM')]
        ];
        if (_0x7b69b2['includes'](_0xd64220)) {
            const _0x24445f = commands[_0x4609df(0x92e, '[AjO')](_0xd64220);
            if (_0x24445f)
                await _0x24445f[_0x4609df(0x965, 'O@hb')](_0x3fb2ce, _0x58f163, [], _0x1f6eb4);
            return !![];
        }
        if (_0x49f3f1[_0x4609df(0x835, 'Gz#P')](_0xd64220, _0x49f3f1[_0x4609df(0x869, 'Dzp9')])) {
            const _0x14cb6e = commands[_0x4609df(0x6f7, 'NOkJ')](_0x49f3f1[_0x4609df(0x38b, '[AjO')]);
            if (_0x14cb6e)
                await _0x14cb6e[_0x4609df(0x728, '[AjO')](_0x3fb2ce, _0x58f163, [], _0x1f6eb4);
            return !![];
        }
        if (_0x49f3f1['jDenR'](_0xd64220, _0x49f3f1['BBqgn'])) {
            const _0x4485a1 = commands[_0x4609df(0x5ee, '[dUU')](_0x49f3f1[_0x4609df(0x400, 'XzzT')]);
            if (_0x4485a1)
                await _0x4485a1[_0x4609df(0xaa0, 'aUOA')](_0x3fb2ce, _0x58f163, [], _0x1f6eb4);
            return !![];
        }
        if (_0x49f3f1[_0x4609df(0x3cc, 'pk&V')](_0xd64220, _0x49f3f1['INCml'])) {
            const _0x39a28b = commands[_0x4609df(0x3a9, '[qEW')](_0x4609df(0x248, '))Nx'));
            if (_0x39a28b)
                await _0x39a28b[_0x4609df(0x8bd, '[qEW')](_0x3fb2ce, _0x58f163, [], _0x1f6eb4);
            return !![];
        }
        if (_0x49f3f1[_0x4609df(0x851, 'VbOS')](_0xd64220, _0x49f3f1[_0x4609df(0x523, 'hKmO')])) {
            const _0x47380a = commands['get'](_0x49f3f1['INCml']);
            if (_0x47380a)
                await _0x47380a['execute'](_0x3fb2ce, _0x58f163, ['--kjv'], _0x1f6eb4);
            return !![];
        }
        if (_0x49f3f1[_0x4609df(0x9be, 'IXWX')](_0xd64220, _0x49f3f1[_0x4609df(0x89a, 'sOIM')])) {
            const _0x50ed16 = commands[_0x4609df(0xa95, 'rNL@')](_0x49f3f1[_0x4609df(0x284, 'dxeI')]);
            if (_0x50ed16)
                await _0x50ed16[_0x4609df(0x295, 'eCWM')](_0x3fb2ce, _0x58f163, [_0x4609df(0xa65, '8*C0')], _0x1f6eb4);
            return !![];
        }
        if (_0x49f3f1['RXRfe'](_0xd64220, _0x49f3f1['nZkLS'])) {
            const _0x411bd7 = commands[_0x4609df(0x4e6, '6#U$')](_0x49f3f1[_0x4609df(0x24a, '[dUU')]);
            if (_0x411bd7)
                await _0x411bd7['execute'](_0x3fb2ce, _0x58f163, [], _0x1f6eb4);
            return !![];
        }
        if (_0xd64220 === _0x49f3f1[_0x4609df(0x9ec, 'eo]Y')]) {
            const _0x4c7d59 = commands['get'](_0x49f3f1[_0x4609df(0x4c3, 'Fpez')]);
            if (_0x4c7d59)
                await _0x4c7d59[_0x4609df(0x8e6, 'Gz#P')](_0x3fb2ce, _0x58f163, [_0x49f3f1[_0x4609df(0x335, 'qyfM')]], _0x1f6eb4);
            return !![];
        }
        if (_0x49f3f1[_0x4609df(0x6dc, '(49)')](_0xd64220, _0x49f3f1[_0x4609df(0x5e6, ')Vmg')])) {
            const _0x169b68 = commands[_0x4609df(0x4e6, '6#U$')](_0x49f3f1[_0x4609df(0x7dc, 'jH^F')]);
            if (_0x169b68)
                await _0x169b68['execute'](_0x3fb2ce, _0x58f163, [], _0x1f6eb4);
            return !![];
        }
        if (_0x49f3f1['smiwd'](_0xd64220, _0x4609df(0x985, 'y7P]')))
            return await _0x3fb2ce['sendMessag' + 'e'](_0x5cd8a5, { 'text': _0x49f3f1['xtEOX'](_0x49f3f1[_0x4609df(0x744, 'aUOA')](_0x49f3f1[_0x4609df(0x2de, '6#U$')](_0x49f3f1[_0x4609df(0xa92, 'bI!F')](_0x49f3f1[_0x4609df(0x554, 'VYw$')](_0x49f3f1[_0x4609df(0x85a, '[dUU')](_0x49f3f1[_0x4609df(0x871, 'qyfM')](_0x49f3f1[_0x4609df(0x413, '%iYw')](_0x49f3f1[_0x4609df(0x49c, '(49)')](_0x49f3f1[_0x4609df(0x496, 'Z&DW')](_0x49f3f1[_0x4609df(0xaac, '@Ss8')](_0x49f3f1[_0x4609df(0x218, 'aUOA')](_0x49f3f1[_0x4609df(0x5e8, 'dxeI')](_0x49f3f1[_0x4609df(0xa7f, 'aUOA')](_0x49f3f1['SxMRx'](_0x49f3f1[_0x4609df(0x87f, 'v!iA')](_0x49f3f1[_0x4609df(0x356, 'jH^F')](_0x49f3f1[_0x4609df(0x2e3, 'sOIM')](_0x49f3f1[_0x4609df(0xa93, 'IXWX')](_0x49f3f1[_0x4609df(0x38d, 'VYw$')](_0x4609df(0x612, '[AjO') + _0x4609df(0x6b9, 'dxeI') + '*\x20📖\x0a\x0a', '╭━━━❲\x20ᴢᴜᴋᴏ' + _0x4609df(0x9d3, '[qEW')) + '┃\x0a', _0x4609df(0x590, 'O@hb') + _0x4609df(0x690, '[qEW') + '\x0a'), _0x4609df(0x2c6, 'XnfP') + _0x4609df(0xa7a, 'IXWX') + _0x4609df(0xa60, 'Dzp9') + 't\x20the\x20bot\x0a'), _0x4609df(0x4ba, 'VbOS') + 'WhatsApp\x20a' + _0x4609df(0x790, 'hKmO') + _0x4609df(0x587, 'Fpez')) + (_0x4609df(0x28c, '@Ss8') + '\x20a\x20QR\x20code' + '.\x0a') + '┃\x0a', _0x4609df(0x62b, '@Ss8') + 'use:*\x0a') + ('┃\x201️⃣\x20' + (_0x1f6eb4[_0x4609df(0x6ab, 'Z&DW')] || '.') + (_0x4609df(0x4b4, 'W#(8') + _0x4609df(0x7cc, 'bI!F'))), _0x4609df(0x93a, '%iYw') + 'nerates\x20an' + _0x4609df(0x6a5, 'XnfP') + 'ode\x0a'), '┃\x203️⃣\x20Open\x20W' + _0x4609df(0x4d2, 'VYw$') + _0x4609df(0x827, '9M@a')) + ('┃\x204️⃣\x20Linked' + '\x20Devices\x20→' + _0x4609df(0x3d4, 'aUOA') + _0x4609df(0x312, 'jobK')), '┃\x205️⃣\x20Enter\x20' + 'the\x208-digi' + _0x4609df(0x7f2, 'aUOA')), _0x4609df(0x1f4, 'jH^F') + _0x4609df(0x21e, '8*C0') + _0x4609df(0x86b, 'Z&DW') + '!\x0a'), '┃\x0a'), _0x4609df(0xab8, 'B9Tk') + 'ments:*\x0a'), '┃\x20•\x20Valid\x20' + _0x4609df(0x4d6, 'NOkJ') + _0x4609df(0x96c, 'Fpez')), _0x4609df(0xa2e, 'Yhq6') + _0x4609df(0x513, '[qEW') + _0x4609df(0x5b8, ')Vmg')), _0x4609df(0x5f6, 'O@hb') + _0x4609df(0x659, 'aUOA') + 'connection' + '\x0a'), '┃\x0a'), _0x4609df(0x337, 'Gz#P') + _0x4609df(0x280, 'NOkJ')), '┃\x20Visit\x20th' + _0x4609df(0x21a, 'ZS%t') + _0x4609df(0x1f0, 'eo]Y')), _0x4609df(0x402, 'O@hb') + 'zuko-md-we' + _0x4609df(0x23a, '[AjO') + 'duction.up' + _0x4609df(0x808, 'K%s%') + _0x4609df(0x92a, 'eo]Y')), '┃\x0a'), _0x4609df(0x980, ')Vmg') + _0x4609df(0x96d, 'jH^F') + _0x4609df(0x31c, '!6eZ')) + (_0x4609df(0x59b, 'Z&DW') + _0x4609df(0x87a, 'Gz#P') + '\x20⚡') }, { 'quoted': _0x58f163 }), !![];
        if (_0x49f3f1['DLjkK'](_0xd64220, _0x49f3f1['BXrfs']))
            return await _0x3fb2ce[_0x4609df(0x68f, 'aUOA') + 'e'](_0x5cd8a5, { 'text': _0x49f3f1[_0x4609df(0xa88, 'aUOA')](_0x49f3f1[_0x4609df(0x24c, '@Ss8')](_0x49f3f1[_0x4609df(0x64c, '))Nx')](_0x49f3f1['hIiOM'](_0x49f3f1[_0x4609df(0x3ab, '3Ek4')](_0x49f3f1['ZHaYT'](_0x49f3f1[_0x4609df(0x53a, ')Vmg')](_0x49f3f1['eibeH'](_0x49f3f1[_0x4609df(0xa35, 'bI!F')](_0x49f3f1['jePYQ'](_0x49f3f1[_0x4609df(0x21f, '3Ek4')](_0x4609df(0x250, '[dUU') + _0x4609df(0xa1c, 'B9Tk') + _0x4609df(0x811, '[dUU') + ('╭━━━❲\x20ᴢᴜᴋᴏ' + _0x4609df(0x99b, '[dUU')), '┃\x0a') + (_0x4609df(0x35b, 'NOkJ') + '\x0a'), _0x4609df(0x2c2, 'K%s%') + _0x4609df(0x340, 'eCWM') + 'b-pair-pro' + 'duction.up' + '.railway.a' + _0x4609df(0x662, 'VYw$')), '┃\x0a'), _0x4609df(0x846, 'Yhq6') + _0x4609df(0x894, 'Fpez')), _0x4609df(0x428, 'Pk!v') + _0x4609df(0x883, '9M@a') + '\x20browser\x0a'), '┃\x202️⃣\x20Enter\x20' + _0x4609df(0xa77, 'Gz#P') + 'App\x20number' + '\x0a'), _0x4609df(0x251, 'hKmO') + _0x4609df(0x917, '3Ek4') + _0x4609df(0x408, '3Ek4') + '\x0a') + (_0x4609df(0x868, '[AjO') + _0x4609df(0x47b, '9M@a') + _0x4609df(0x6a8, 'O@hb') + _0x4609df(0x818, 'jobK')), _0x4609df(0x8bc, 'Yhq6') + _0x4609df(0xa5f, '[dUU') + _0x4609df(0x5fa, ')Vmg') + '!\x0a') + '┃\x0a', _0x4609df(0x341, 'v!iA') + 's:*\x0a'), _0x4609df(0x69d, 'Pk!v') + _0x4609df(0x817, 'bI!F') + 'd\x0a') + (_0x4609df(0x634, 'jobK') + _0x4609df(0x657, 'Dzp9') + _0x4609df(0x7b0, '9M@a')) + ('┃\x20•\x20Fast\x20a' + _0x4609df(0x635, 'W#(8')) + '┃\x0a', _0x4609df(0x650, '[dUU') + _0x4609df(0x986, 'B9Tk') + _0x4609df(0x4a5, 'O@hb')) + (_0x4609df(0x6f2, '!$R8') + _0x4609df(0xa54, '(49)') + '\x20⚡') }, { 'quoted': _0x58f163 }), !![];
        if (_0x49f3f1[_0x4609df(0x49e, 'B9Tk')](_0xd64220, _0x49f3f1[_0x4609df(0x3b1, 'Yhq6')])) {
            const _0x5253f6 = commands['get'](_0x4609df(0x9b4, '9M@a'));
            if (_0x5253f6)
                await _0x5253f6[_0x4609df(0x3ce, 'W#(8')](_0x3fb2ce, _0x58f163, [_0x49f3f1[_0x4609df(0x5a0, '8*C0')]], _0x1f6eb4);
            return !![];
        }
        if (_0x49f3f1[_0x4609df(0x692, 'B9Tk')](_0xd64220, _0x4609df(0x1e7, '8*C0') + _0x4609df(0x934, '%iYw'))) {
            const _0x79e950 = commands['get'](_0x49f3f1[_0x4609df(0x76b, 'NOkJ')]);
            if (_0x79e950)
                await _0x79e950['execute'](_0x3fb2ce, _0x58f163, [_0x49f3f1[_0x4609df(0x74b, ')Vmg')]], _0x1f6eb4);
            return !![];
        }
        if (_0xd64220 === _0x49f3f1[_0x4609df(0x689, 'Dzp9')]) {
            const _0x523e54 = commands[_0x4609df(0x446, 'ZS%t')](_0x4609df(0x823, 'VbOS'));
            if (_0x523e54)
                await _0x523e54[_0x4609df(0x774, 'Fpez')](_0x3fb2ce, _0x58f163, [_0x49f3f1['KWNLt']], _0x1f6eb4);
            return !![];
        }
        if (_0x49f3f1[_0x4609df(0x722, ')Vmg')](_0xd64220, _0x49f3f1['fuDqk'])) {
            const _0x29702e = commands['get'](_0x49f3f1[_0x4609df(0x623, 'y7P]')]);
            if (_0x29702e)
                await _0x29702e[_0x4609df(0x875, '))Nx')](_0x3fb2ce, _0x58f163, [_0x4609df(0x216, '9M@a')], _0x1f6eb4);
            return !![];
        }
        if (_0xd64220 === _0x4609df(0x223, '[dUU')) {
            const _0x187020 = commands[_0x4609df(0x33b, 'jH^F')](_0x49f3f1[_0x4609df(0x5a1, 'W#(8')]);
            if (_0x187020)
                await _0x187020[_0x4609df(0x9e3, 'XnfP')](_0x3fb2ce, _0x58f163, [], _0x1f6eb4);
            return !![];
        }
        if (_0x49f3f1[_0x4609df(0x78c, '[dUU')](_0xd64220, _0x49f3f1[_0x4609df(0x582, '!$R8')])) {
            const _0x13a927 = commands['get'](_0x49f3f1[_0x4609df(0x8e9, 'ZS%t')]);
            if (_0x13a927)
                await _0x13a927[_0x4609df(0x774, 'Fpez')](_0x3fb2ce, _0x58f163, [_0x49f3f1['jXeLv']], _0x1f6eb4);
            return !![];
        }
        if (_0x49f3f1[_0x4609df(0xa91, '[qEW')](_0xd64220, _0x49f3f1['dLdYA'])) {
            const {performUpdate: _0x576b07} = await import('./commands' + '/update.js');
            return await _0x49f3f1['kHILy'](_0x576b07, _0x5cd8a5, _0x3fb2ce, _0x58f163, buttons), !![];
        }
        if (_0xd64220 === _0x49f3f1[_0x4609df(0x2ef, '3Ek4')]) {
            const {cancelUpdate: _0x42303e} = await import(_0x49f3f1[_0x4609df(0x994, 'rNL@')]);
            return await _0x42303e(_0x5cd8a5, _0x3fb2ce, _0x58f163), !![];
        }
        if (_0x49f3f1[_0x4609df(0x641, 'IXWX')](_0xd64220, _0x49f3f1[_0x4609df(0x61a, 'K%s%')])) {
            const {showUpdateStatus: _0x520b7c} = await import(_0x49f3f1[_0x4609df(0x94e, 'jH^F')]);
            return await _0x49f3f1[_0x4609df(0x53d, '%iYw')](_0x520b7c, _0x5cd8a5, _0x3fb2ce, _0x58f163, buttons), !![];
        }
        if (_0x49f3f1[_0x4609df(0x527, 'eCWM')](_0xd64220, _0x49f3f1[_0x4609df(0x415, 'W#(8')])) {
            const _0xa31437 = commands[_0x4609df(0x2d4, 'O@hb')](_0x49f3f1['rWOyO']);
            if (_0xa31437)
                await _0xa31437[_0x4609df(0x4f6, '9M@a')](_0x3fb2ce, _0x58f163, [_0x49f3f1['ugsFA']], _0x1f6eb4);
            return !![];
        }
        if (_0xd64220 === _0x49f3f1[_0x4609df(0x69c, '[qEW')]) {
            const _0x1f87dd = commands[_0x4609df(0xab5, 'fr)d')](_0x49f3f1[_0x4609df(0x303, 'O@hb')]);
            if (_0x1f87dd)
                await _0x1f87dd[_0x4609df(0x983, 'eo]Y')](_0x3fb2ce, _0x58f163, [], _0x1f6eb4);
            return !![];
        }
        if (_0x49f3f1[_0x4609df(0x9f3, 'eo]Y')](_0xd64220, _0x49f3f1[_0x4609df(0x932, 'VbOS')])) {
            const _0x2edcf3 = commands[_0x4609df(0x73a, 'Gz#P')](_0x49f3f1[_0x4609df(0x4c5, 'VYw$')]);
            if (_0x2edcf3)
                await _0x2edcf3[_0x4609df(0x435, 'VX^@')](_0x3fb2ce, _0x58f163, [], _0x1f6eb4);
            return !![];
        }
        if (_0x49f3f1['EUKrl'](_0xd64220, _0x49f3f1[_0x4609df(0x8ab, 'ih4U')])) {
            const _0x442f46 = commands[_0x4609df(0x6e7, 'jobK')](_0x49f3f1[_0x4609df(0x321, 'y7P]')]);
            if (_0x442f46)
                await _0x442f46[_0x4609df(0x8bd, '[qEW')](_0x3fb2ce, _0x58f163, [], _0x1f6eb4);
            return !![];
        }
        if (_0x49f3f1[_0x4609df(0x2d9, '(49)')](_0xd64220, _0x49f3f1[_0x4609df(0x499, 'VYw$')])) {
            const _0x11625b = commands[_0x4609df(0x54f, 'XnfP')](_0x49f3f1[_0x4609df(0x580, '9M@a')]);
            if (_0x11625b)
                await _0x11625b[_0x4609df(0x34f, 'hKmO')](_0x3fb2ce, _0x58f163, ['--audio'], _0x1f6eb4);
            return !![];
        }
        if (_0x49f3f1['tDFLT'](_0xd64220, _0x49f3f1[_0x4609df(0x956, '(49)')])) {
            const _0x13ddc8 = commands[_0x4609df(0x3d2, '!6eZ')](_0x49f3f1[_0x4609df(0x256, 'eo]Y')]);
            if (_0x13ddc8)
                await _0x13ddc8[_0x4609df(0x9d2, ')Vmg')](_0x3fb2ce, _0x58f163, [], _0x1f6eb4);
            return !![];
        }
        if (_0xd64220 === _0x49f3f1[_0x4609df(0x397, 'rNL@')]) {
            const _0x3873c9 = commands[_0x4609df(0x99e, 'B9Tk')](_0x49f3f1[_0x4609df(0x84b, '[AjO')]);
            if (_0x3873c9)
                await _0x3873c9[_0x4609df(0x9d2, ')Vmg')](_0x3fb2ce, _0x58f163, [], _0x1f6eb4);
            return !![];
        }
        if (_0xd64220 === _0x49f3f1[_0x4609df(0x873, 'jobK')]) {
            const _0x50e5b9 = commands[_0x4609df(0x446, 'ZS%t')](_0x49f3f1[_0x4609df(0x381, 'jH^F')]);
            if (_0x50e5b9)
                await _0x50e5b9['execute'](_0x3fb2ce, _0x58f163, [_0x49f3f1['PNiKt']], _0x1f6eb4);
            return !![];
        }
        if (_0xd64220 === _0x4609df(0x929, '!6eZ')) {
            const _0x356f4c = commands[_0x4609df(0x238, 'v!iA')](_0x4609df(0x483, '(49)'));
            if (_0x356f4c)
                await _0x356f4c[_0x4609df(0x9d2, ')Vmg')](_0x3fb2ce, _0x58f163, [], _0x1f6eb4);
            return !![];
        }
        if (_0x49f3f1['WymJW'](_0xd64220, _0x49f3f1[_0x4609df(0x601, '))Nx')])) {
            const _0x39ff66 = commands[_0x4609df(0xaa2, '@Ss8')](_0x49f3f1[_0x4609df(0x3ac, 'Z&DW')]);
            if (_0x39ff66)
                await _0x39ff66[_0x4609df(0x9e7, 'VbOS')](_0x3fb2ce, _0x58f163, [], _0x1f6eb4);
            return !![];
        }
        if (_0x49f3f1['OdHMQ'](_0xd64220, _0x49f3f1[_0x4609df(0x859, 'XzzT')])) {
            const _0x42ea09 = commands[_0x4609df(0x4e6, '6#U$')](_0x4609df(0x77a, '6#U$'));
            if (_0x42ea09)
                await _0x42ea09[_0x4609df(0x847, '!6eZ')](_0x3fb2ce, _0x58f163, [], _0x1f6eb4);
            return !![];
        }
        if (_0x49f3f1['OdHMQ'](_0xd64220, _0x49f3f1[_0x4609df(0x42f, 'VX^@')])) {
            const _0x72035d = commands[_0x4609df(0x7ee, 'Pk!v')](_0x49f3f1['eSKkQ']);
            if (_0x72035d)
                await _0x72035d['execute'](_0x3fb2ce, _0x58f163, [_0x4609df(0x862, 'aUOA')], _0x1f6eb4);
            return !![];
        }
        if (_0x49f3f1[_0x4609df(0x55b, 'Pk!v')](_0xd64220, _0x49f3f1[_0x4609df(0x4da, 'Z&DW')])) {
            const _0x368961 = commands[_0x4609df(0x6c2, ')Vmg')](_0x49f3f1[_0x4609df(0x9f7, '!$R8')]);
            if (_0x368961)
                await _0x368961['execute'](_0x3fb2ce, _0x58f163, [], _0x1f6eb4);
            return !![];
        }
        if (_0x49f3f1[_0x4609df(0x476, '!6eZ')](_0xd64220, _0x4609df(0x8ec, '!$R8'))) {
            const _0x5a8339 = commands['get'](_0x49f3f1[_0x4609df(0x249, 'qyfM')]);
            if (_0x5a8339)
                await _0x5a8339['execute'](_0x3fb2ce, _0x58f163, [], _0x1f6eb4);
            return !![];
        }
        if (_0x49f3f1[_0x4609df(0x747, 'eCWM')](_0xd64220, _0x49f3f1[_0x4609df(0x726, '%iYw')]))
            return await _0x3fb2ce[_0x4609df(0x32f, '!6eZ') + 'e'](_0x5cd8a5, { 'text': _0x49f3f1[_0x4609df(0x618, 'eCWM')](_0x49f3f1['eibeH'](_0x49f3f1[_0x4609df(0x937, 'Pk!v')](_0x49f3f1[_0x4609df(0x57f, 'hKmO')](_0x49f3f1[_0x4609df(0x84e, 'eo]Y')](_0x49f3f1[_0x4609df(0x79a, 'VX^@')](_0x49f3f1[_0x4609df(0x691, '@Ss8')](_0x49f3f1['eibeH'](_0x49f3f1[_0x4609df(0xaa4, 'NOkJ')](_0x49f3f1['xsnBg'](_0x49f3f1[_0x4609df(0x2c1, ')Vmg')](_0x49f3f1[_0x4609df(0x29d, 'VX^@')](_0x49f3f1[_0x4609df(0x6ad, '!6eZ')](_0x49f3f1[_0x4609df(0x6c7, '9M@a')](_0x49f3f1[_0x4609df(0xaa6, 'XnfP')]('📖\x20*ＤＥＬＥＴＥ\x20' + _0x4609df(0xa08, 'bI!F') + _0x4609df(0x879, 'qyfM'), _0x4609df(0x8f3, 'VbOS') + '\x20ᴍᴅ\x20❳━━━╮\x0a'), '┃\x0a'), '┃\x20*How\x20to\x20' + _0x4609df(0x6b3, '%iYw') + _0x4609df(0x526, 'Dzp9') + _0x4609df(0xa99, 'y7P]')), '┃\x0a') + (_0x4609df(0x2d7, '8*C0') + _0x4609df(0x352, 'v!iA') + _0x4609df(0x4f9, 'Yhq6') + _0x4609df(0x3b2, 'Gz#P')), _0x4609df(0x687, '))Nx') + _0x4609df(0x8e7, 'eCWM') + 'at\x20message' + '\x0a') + ('┃\x203️⃣\x20Tap\x20\x22R' + 'EPLY\x22\x0a') + (_0x4609df(0x61c, '[qEW') + (_0x1f6eb4[_0x4609df(0x498, 'dxeI')] || '.') + 'delete\x0a'), _0x4609df(0x865, '))Nx') + _0x4609df(0x6cc, '))Nx') + '\x0a') + '┃\x0a', _0x4609df(0x9da, 'hKmO') + _0x4609df(0x660, '@Ss8')), _0x4609df(0x2b2, 'Yhq6') + _0x4609df(0x2a1, 'sOIM') + _0x4609df(0x897, 'W#(8') + '\x0a') + (_0x4609df(0x63d, '!6eZ') + _0x4609df(0x3a1, 'cl&d') + _0x4609df(0x99c, 'XnfP')), '┃\x20•\x20Messag' + _0x4609df(0x204, 'bI!F') + _0x4609df(0x4ac, 'O@hb') + 'rs\x20cannot\x20' + _0x4609df(0x9aa, 'bI!F') + '\x0a'), '┃\x0a'), _0x4609df(0x933, 'ih4U') + _0x4609df(0x8c1, 'VYw$')), _0x4609df(0x705, 'sOIM') + _0x4609df(0x6bc, ')Vmg') + 'e\x20their\x20ow' + _0x4609df(0xa3f, 'Fpez') + _0x4609df(0x6f1, 'cl&d')) + (_0x4609df(0xa22, ')Vmg') + _0x4609df(0x5e2, '%iYw') + _0x4609df(0x825, 'bI!F') + _0x4609df(0x6ee, 'pk&V')), '┃\x20•\x20Owner\x20' + _0x4609df(0x3c5, 'v!iA') + '\x20any\x20bot\x20m' + _0x4609df(0x516, 'cl&d')) + '┃\x0a', '╰━━━━━━━━━' + _0x4609df(0x3f6, 'Kh1Y') + '━━╯\x0a\x0a'), _0x4609df(0x265, '[AjO') + _0x4609df(0x84f, ')Vmg') + '\x20⚡') }, { 'quoted': _0x58f163 }), !![];
        if (_0x49f3f1[_0x4609df(0x682, '8*C0')](_0xd64220, _0x49f3f1[_0x4609df(0x270, 'rNL@')])) {
            const {handleDeleteAllConfirm: _0x3859ca} = await import(_0x49f3f1[_0x4609df(0x7e7, 'Pk!v')]), _0x22020d = Date[_0x4609df(0x4df, 'W#(8')]()[_0x4609df(0x22e, '[dUU')]();
            return await _0x49f3f1[_0x4609df(0xa1f, 'B9Tk')](_0x3859ca, _0x3fb2ce, _0x22020d, !![]), !![];
        }
        if (_0xd64220 === _0x49f3f1[_0x4609df(0xa32, 'W#(8')]) {
            const {handleDeleteAllConfirm: _0xb1995a} = await import(_0x49f3f1['MhTCr']), _0x26c7f2 = Date[_0x4609df(0x78b, '8*C0')]()[_0x4609df(0x99a, 'pk&V')]();
            return await _0x49f3f1['YkwyP'](_0xb1995a, _0x3fb2ce, _0x26c7f2, ![]), !![];
        }
        if (_0x49f3f1[_0x4609df(0x7e2, ')Vmg')](_0xd64220, _0x4609df(0x21b, 'v!iA') + _0x4609df(0x9c3, '(49)')))
            return await _0x3fb2ce[_0x4609df(0x6bf, 'Dzp9') + 'e'](_0x5cd8a5, { 'text': _0x49f3f1[_0x4609df(0x372, 'Yhq6')](_0x49f3f1[_0x4609df(0xa5e, 'O@hb')](_0x49f3f1[_0x4609df(0x9ac, 'IXWX')](_0x49f3f1[_0x4609df(0xa14, 'K%s%')](_0x49f3f1[_0x4609df(0x3a6, 'VX^@')](_0x49f3f1[_0x4609df(0x71c, '!6eZ')](_0x49f3f1[_0x4609df(0x5c6, 'VbOS')](_0x49f3f1[_0x4609df(0x9c0, 'fr)d')](_0x49f3f1[_0x4609df(0x604, 'Gz#P')](_0x49f3f1[_0x4609df(0x8d2, 'XnfP')](_0x49f3f1[_0x4609df(0x230, '[AjO')](_0x4609df(0x856, '9M@a') + 'ＡＬＬ\x20ＨＥＬＰ*\x20' + _0x4609df(0x9ab, 'Fpez'), _0x4609df(0x43e, '@Ss8') + _0x4609df(0x462, 'y7P]')), '┃\x0a') + (_0x4609df(0x86e, 'XzzT') + 'use:*\x0a'), _0x4609df(0x923, '9M@a') + _0x4609df(0x83c, 'K%s%') + _0x4609df(0x600, 'qyfM')) + (_0x4609df(0x4b6, 'Pk!v') + '.deleteall' + _0x4609df(0x6af, 'VbOS')), '┃\x0a'), _0x4609df(0x8d1, 'jH^F') + _0x4609df(0x79e, 'aUOA')), _0x4609df(0x60d, 'Z&DW') + 'eall\x205\x20-\x20D' + _0x4609df(0x4a2, 'Gz#P') + _0x4609df(0x5b4, 'aUOA') + 's\x0a') + (_0x4609df(0x520, '9M@a') + _0x4609df(0x54e, '6#U$') + _0x4609df(0x50b, 'K%s%') + _0x4609df(0x5d5, 'Kh1Y') + _0x4609df(0x3b5, 'fr)d')) + (_0x4609df(0x9d8, 'dxeI') + _0x4609df(0x6fa, 'Z&DW') + 'ete\x20last\x205' + _0x4609df(0x344, '%iYw') + '\x0a'), '┃\x0a'), _0x4609df(0x379, 'v!iA') + '*\x0a'), _0x4609df(0x544, 'cl&d') + _0x4609df(0x5fc, 'XzzT') + 'per\x20comman' + 'd\x0a') + (_0x4609df(0xa73, 'W#(8') + _0x4609df(0x630, 'O@hb') + _0x4609df(0x20b, 'eo]Y') + _0x4609df(0x957, 'fr)d') + _0x4609df(0x993, '[qEW')) + ('┃\x20•\x20Only\x20d' + _0x4609df(0x7d0, '!$R8') + 'O\x20MD\x20messa' + _0x4609df(0x5ba, '@Ss8')), '┃\x0a') + (_0x4609df(0x697, '!6eZ') + _0x4609df(0x986, 'B9Tk') + _0x4609df(0x5cc, 'XnfP')), _0x4609df(0x44a, 'Pk!v') + _0x4609df(0x8b4, 'eo]Y') + '\x20⚡') }, { 'quoted': _0x58f163 }), !![];
        if (_0xd64220 === _0x49f3f1[_0x4609df(0x939, 'NOkJ')]) {
            const _0x2f6dbd = commands[_0x4609df(0x439, 'Fpez')](_0x49f3f1['xUgSf']);
            if (_0x2f6dbd)
                await _0x2f6dbd['execute'](_0x3fb2ce, _0x58f163, [], _0x1f6eb4);
            return !![];
        }
        if (_0x49f3f1[_0x4609df(0x281, '3Ek4')](_0xd64220, _0x49f3f1[_0x4609df(0x7c2, 'Dzp9')])) {
            const _0x2aeb2b = commands[_0x4609df(0x7a2, 'sOIM')](_0x49f3f1[_0x4609df(0x353, 'sOIM')]);
            if (_0x2aeb2b)
                await _0x2aeb2b['execute'](_0x3fb2ce, _0x58f163, [_0x49f3f1[_0x4609df(0x66f, 'sOIM')]], _0x1f6eb4);
            return !![];
        }
        if (_0x49f3f1[_0x4609df(0x6c3, '[AjO')](_0xd64220, _0x49f3f1[_0x4609df(0x8c5, 'W#(8')])) {
            const _0x1e0a29 = commands[_0x4609df(0x453, 'VX^@')](_0x4609df(0x81a, 'K%s%'));
            if (_0x1e0a29)
                await _0x1e0a29[_0x4609df(0xaa0, 'aUOA')](_0x3fb2ce, _0x58f163, [], _0x1f6eb4);
            return !![];
        }
        if (_0x49f3f1[_0x4609df(0x4be, 'dxeI')](_0xd64220, _0x49f3f1[_0x4609df(0x5ff, 'Yhq6')])) {
            const _0x48b621 = commands[_0x4609df(0x92e, '[AjO')](_0x4609df(0x1fd, 'VX^@'));
            if (_0x48b621)
                await _0x48b621['execute'](_0x3fb2ce, _0x58f163, [], _0x1f6eb4);
            return !![];
        }
        if (_0xd64220 === _0x49f3f1[_0x4609df(0x6cf, 'VbOS')]) {
            const _0x135434 = commands[_0x4609df(0x4c0, 'VbOS')](_0x49f3f1['FBuMq']);
            if (_0x135434)
                await _0x135434[_0x4609df(0x8e6, 'Gz#P')](_0x3fb2ce, _0x58f163, [], _0x1f6eb4);
            return !![];
        }
        if (_0xd64220 === _0x49f3f1[_0x4609df(0x2c5, '[qEW')]) {
            const _0x3df3c5 = commands['get'](_0x49f3f1[_0x4609df(0x4ad, 'aUOA')]);
            if (_0x3df3c5)
                await _0x3df3c5[_0x4609df(0xa7e, 'rNL@')](_0x3fb2ce, _0x58f163, [], _0x1f6eb4);
            return !![];
        }
        if (_0x49f3f1[_0x4609df(0x583, 'sOIM')](_0xd64220, _0x49f3f1[_0x4609df(0x62a, 'NOkJ')])) {
            const _0x12bcbb = commands[_0x4609df(0xa1e, 'eCWM')](_0x4609df(0xa06, '%iYw'));
            if (_0x12bcbb)
                await _0x12bcbb[_0x4609df(0x847, '!6eZ')](_0x3fb2ce, _0x58f163, [], _0x1f6eb4);
            return !![];
        }
        if (_0x49f3f1[_0x4609df(0xa9a, '@Ss8')](_0xd64220, _0x49f3f1['GaeMY'])) {
            const _0x358ad9 = commands[_0x4609df(0x6e7, 'jobK')](_0x4609df(0x1fb, 'Kh1Y'));
            if (_0x358ad9)
                await _0x358ad9['execute'](_0x3fb2ce, _0x58f163, [_0x49f3f1[_0x4609df(0x9b2, 'XzzT')]], _0x1f6eb4);
            return !![];
        }
        if (_0xd64220 && _0xd64220[_0x4609df(0x602, '[dUU')](_0x4609df(0x438, '[dUU'))) {
            const _0x149781 = _0xd64220[_0x4609df(0xa9d, 'eCWM')]('_'), _0x5ad99c = _0x149781[0x1], _0x41f2e0 = _0x49f3f1[_0x4609df(0x640, 'Pk!v')](parseInt, _0x149781[0x2]), _0x14d08e = parseInt(_0x149781[0x3]), {handleTicTacToeMove: _0x23750f} = await import(_0x49f3f1[_0x4609df(0x988, 'bI!F')]);
            return await _0x49f3f1[_0x4609df(0x93f, 'qyfM')](_0x23750f, _0x3fb2ce, _0x58f163, _0x1f6eb4, _0x5ad99c, _0x41f2e0, _0x14d08e), !![];
        }
        if (_0xd64220 && _0xd64220['startsWith'](_0x49f3f1[_0x4609df(0x78f, 'v!iA')])) {
            const _0x2d7059 = _0xd64220[_0x4609df(0x2f3, 'eo]Y')](_0x49f3f1[_0x4609df(0x8a4, 'rNL@')], ''), _0x19c2f7 = commands['get'](_0x49f3f1[_0x4609df(0x3ff, '!6eZ')]);
            if (_0x19c2f7)
                await _0x19c2f7[_0x4609df(0x7ed, 'Z&DW')](_0x3fb2ce, _0x58f163, [_0x49f3f1[_0x4609df(0x88d, 'NOkJ')]], _0x1f6eb4);
            return !![];
        }
        if (_0xd64220 && _0xd64220['startsWith']('ttt_cancel' + '_')) {
            const _0x193ba8 = _0xd64220[_0x4609df(0x941, 'VbOS')](_0x49f3f1[_0x4609df(0x7d6, '8*C0')], ''), _0x2e7440 = commands[_0x4609df(0xab5, 'fr)d')](_0x49f3f1[_0x4609df(0x91b, 'dxeI')]);
            if (_0x2e7440)
                await _0x2e7440[_0x4609df(0x295, 'eCWM')](_0x3fb2ce, _0x58f163, [_0x49f3f1[_0x4609df(0x2e8, '))Nx')]], _0x1f6eb4);
            return !![];
        }
        if (_0x49f3f1[_0x4609df(0x2a7, '%iYw')](_0xd64220, _0x49f3f1[_0x4609df(0x404, 'Dzp9')])) {
            const _0xf930a8 = commands[_0x4609df(0x7a2, 'sOIM')](_0x49f3f1[_0x4609df(0x4e8, '!$R8')]);
            if (_0xf930a8)
                await _0xf930a8[_0x4609df(0x51c, '(49)')](_0x3fb2ce, _0x58f163, [], _0x1f6eb4);
            return !![];
        }
        if (_0x49f3f1[_0x4609df(0x44b, 'dxeI')](_0xd64220, _0x49f3f1[_0x4609df(0x22f, 'y7P]')])) {
            const _0x25c5d8 = commands[_0x4609df(0x896, 'qyfM')](_0x49f3f1['pUTgy']);
            if (_0x25c5d8)
                await _0x25c5d8['execute'](_0x3fb2ce, _0x58f163, [], _0x1f6eb4);
            return !![];
        }
        if (_0xd64220 === 'setgpp') {
            const _0x57f128 = commands[_0x4609df(0x3ef, '!$R8')](_0x4609df(0x436, 'Dzp9'));
            if (_0x57f128)
                await _0x57f128[_0x4609df(0x295, 'eCWM')](_0x3fb2ce, _0x58f163, [], _0x1f6eb4);
            return !![];
        }
        if (_0x49f3f1[_0x4609df(0x626, '8*C0')](_0xd64220, _0x4609df(0x95f, 'Pk!v'))) {
            const _0x4f2502 = commands[_0x4609df(0xab5, 'fr)d')](_0x49f3f1[_0x4609df(0x495, '[AjO')]);
            if (_0x4f2502)
                await _0x4f2502[_0x4609df(0x67e, 'bI!F')](_0x3fb2ce, _0x58f163, ['on'], _0x1f6eb4);
            return !![];
        }
        if (_0x49f3f1[_0x4609df(0x48b, '[dUU')](_0xd64220, _0x49f3f1[_0x4609df(0xab1, 'Fpez')])) {
            const _0x26a665 = commands[_0x4609df(0x786, '8*C0')](_0x49f3f1[_0x4609df(0x52e, 'aUOA')]);
            if (_0x26a665)
                await _0x26a665[_0x4609df(0x983, 'eo]Y')](_0x3fb2ce, _0x58f163, [_0x4609df(0x7e4, '6#U$')], _0x1f6eb4);
            return !![];
        }
        if (_0x49f3f1[_0x4609df(0x7c8, 'VbOS')](_0xd64220, _0x49f3f1[_0x4609df(0x210, '6#U$')])) {
            const _0x5a692e = commands[_0x4609df(0x238, 'v!iA')](_0x49f3f1[_0x4609df(0x488, 'jH^F')]);
            if (_0x5a692e)
                await _0x5a692e[_0x4609df(0x451, 'XzzT')](_0x3fb2ce, _0x58f163, ['on'], _0x1f6eb4);
            return !![];
        }
        if (_0xd64220 === _0x49f3f1[_0x4609df(0x78a, 'Yhq6')]) {
            const _0x4e5515 = commands[_0x4609df(0x81b, 'K%s%')](_0x49f3f1[_0x4609df(0x369, 'dxeI')]);
            if (_0x4e5515)
                await _0x4e5515['execute'](_0x3fb2ce, _0x58f163, [_0x4609df(0x4ea, 'Z&DW')], _0x1f6eb4);
            return !![];
        }
        if (_0x49f3f1[_0x4609df(0x830, ')Vmg')](_0xd64220, _0x49f3f1[_0x4609df(0x2fb, 'ih4U')])) {
            const _0x162265 = commands[_0x4609df(0xa28, 'cl&d')](_0x49f3f1[_0x4609df(0xaae, 'W#(8')]);
            if (_0x162265)
                await _0x162265[_0x4609df(0x543, 'Kh1Y')](_0x3fb2ce, _0x58f163, [], _0x1f6eb4);
            return !![];
        }
        if (_0x49f3f1[_0x4609df(0x430, 'O@hb')](_0xd64220, _0x49f3f1[_0x4609df(0x673, 'bI!F')])) {
            const _0x3d16a9 = commands[_0x4609df(0x3ef, '!$R8')](_0x49f3f1[_0x4609df(0x8ea, 'NOkJ')]);
            if (_0x3d16a9)
                await _0x3d16a9[_0x4609df(0x451, 'XzzT')](_0x3fb2ce, _0x58f163, [], _0x1f6eb4);
            return !![];
        }
        if (_0x49f3f1['YGURt'](_0xd64220, _0x49f3f1[_0x4609df(0x7a7, 'ih4U')])) {
            const _0x3fdcf8 = commands[_0x4609df(0x566, 'dxeI')](_0x49f3f1[_0x4609df(0x761, ')Vmg')]);
            if (_0x3fdcf8)
                await _0x3fdcf8[_0x4609df(0x9e3, 'XnfP')](_0x3fb2ce, _0x58f163, [], _0x1f6eb4);
            return !![];
        }
        if (_0x49f3f1[_0x4609df(0x654, 'bI!F')](_0xd64220, _0x49f3f1[_0x4609df(0x708, '!6eZ')])) {
            const _0x568d4a = commands[_0x4609df(0x33b, 'jH^F')](_0x49f3f1[_0x4609df(0x534, 'Kh1Y')]);
            if (_0x568d4a)
                await _0x568d4a['execute'](_0x3fb2ce, _0x58f163, ['on'], _0x1f6eb4);
            return !![];
        }
        if (_0x49f3f1[_0x4609df(0x390, 'Dzp9')](_0xd64220, _0x4609df(0x88f, 'dxeI') + 'f')) {
            const _0x43b22b = commands['get'](_0x49f3f1[_0x4609df(0x37c, 'Gz#P')]);
            if (_0x43b22b)
                await _0x43b22b[_0x4609df(0x983, 'eo]Y')](_0x3fb2ce, _0x58f163, [_0x4609df(0x672, 'W#(8')], _0x1f6eb4);
            return !![];
        }
        if (_0x49f3f1[_0x4609df(0x533, 'XzzT')](_0xd64220, _0x4609df(0x908, 'hKmO') + 'c')) {
            const _0x597bbe = commands['get'](_0x4609df(0x764, 'Kh1Y'));
            if (_0x597bbe)
                await _0x597bbe[_0x4609df(0x3e8, '3Ek4')](_0x3fb2ce, _0x58f163, [_0x49f3f1[_0x4609df(0x9b7, ')Vmg')]], _0x1f6eb4);
            return !![];
        }
        if (_0x49f3f1[_0x4609df(0x867, 'y7P]')](_0xd64220, _0x49f3f1[_0x4609df(0x35d, 'qyfM')])) {
            const _0x4cfa04 = commands[_0x4609df(0x896, 'qyfM')](_0x49f3f1[_0x4609df(0x9cd, 'Kh1Y')]);
            if (_0x4cfa04)
                await _0x4cfa04['execute'](_0x3fb2ce, _0x58f163, [_0x49f3f1[_0x4609df(0x8ff, '6#U$')]], _0x1f6eb4);
            return !![];
        }
        if (_0x49f3f1['QKjAc'](_0xd64220, _0x49f3f1[_0x4609df(0x44c, 'Dzp9')])) {
            const {performUpdate: _0x38db8d} = await import(_0x49f3f1[_0x4609df(0x75b, 'Z&DW')]);
            return await _0x38db8d(_0x5cd8a5, _0x3fb2ce, _0x58f163), !![];
        }
        if (_0xd64220 === 'ai') {
            const _0x59c2b9 = commands[_0x4609df(0x95c, 'y7P]')]('ai');
            if (_0x59c2b9)
                await _0x59c2b9[_0x4609df(0x5a8, 'cl&d')](_0x3fb2ce, _0x58f163, [], _0x1f6eb4);
            return !![];
        }
        if (_0xd64220 === _0x49f3f1[_0x4609df(0xaba, '[qEW')]) {
            const _0x2705d1 = commands[_0x4609df(0x3a9, '[qEW')]('ai');
            if (_0x2705d1)
                await _0x2705d1[_0x4609df(0x9e0, '6#U$')](_0x3fb2ce, _0x58f163, [_0x49f3f1[_0x4609df(0x578, 'rNL@')]], _0x1f6eb4);
            return !![];
        }
        if (_0xd64220 === _0x49f3f1[_0x4609df(0xa19, 'hKmO')]) {
            const _0x5edf29 = commands[_0x4609df(0x81b, 'K%s%')](_0x49f3f1['cGILw']);
            if (_0x5edf29)
                await _0x5edf29[_0x4609df(0x5cd, 'pk&V')](_0x3fb2ce, _0x58f163, [], _0x1f6eb4);
            return !![];
        }
        if (commands[_0x4609df(0x391, 'B9Tk')](_0xd64220)) {
            const _0x5da9e1 = commands[_0x4609df(0x6f7, 'NOkJ')](_0xd64220);
            return await _0x5da9e1[_0x4609df(0x5a2, 'ih4U')](_0x3fb2ce, _0x58f163, [], _0x1f6eb4), !![];
        }
        return ![];
    }, handleMessage = async (_0x5e48e7, _0x557661) => {
        const _0x3bce83 = _0x3337, _0x4032d2 = {
                'ZRKOB': function (_0x20c04a, _0x1422a9) {
                    return _0x20c04a(_0x1422a9);
                },
                'gOUzo': function (_0x5b3b03) {
                    return _0x5b3b03();
                },
                'SIBXv': _0x3bce83(0x3e1, 'cl&d') + _0x3bce83(0x7b4, 'jobK'),
                'gpQqv': 'senderKeyD' + _0x3bce83(0x88c, 'IXWX') + 'nMessage',
                'KikXl': function (_0x471719, _0x2cac11, _0x835f3) {
                    return _0x471719(_0x2cac11, _0x835f3);
                },
                'JWStG': function (_0x465395, _0x1f5732) {
                    return _0x465395 === _0x1f5732;
                },
                'wcMJw': function (_0x3795b6, _0x59dd84) {
                    return _0x3795b6 || _0x59dd84;
                },
                'URWjm': function (_0x3dc302, _0x4a912c) {
                    return _0x3dc302(_0x4a912c);
                },
                'MznWO': function (_0xa9d823, _0x8320a3, _0x3ca23a, _0x17b16c, _0x4fa835) {
                    return _0xa9d823(_0x8320a3, _0x3ca23a, _0x17b16c, _0x4fa835);
                },
                'dWzGC': function (_0x29b1ee, _0x21614b, _0x26ac9b, _0x498073) {
                    return _0x29b1ee(_0x21614b, _0x26ac9b, _0x498073);
                },
                'OIQOx': function (_0x3b710e, _0x416061, _0x1898f7, _0x29edbd) {
                    return _0x3b710e(_0x416061, _0x1898f7, _0x29edbd);
                },
                'GDuvu': function (_0x72c48d, _0x4ea18d, _0x4c3c56, _0x55780a) {
                    return _0x72c48d(_0x4ea18d, _0x4c3c56, _0x55780a);
                },
                'GgnWG': function (_0xa484da, _0xbd7735, _0x5aa26a, _0x128e0b) {
                    return _0xa484da(_0xbd7735, _0x5aa26a, _0x128e0b);
                },
                'otDSc': function (_0x2fd7b3, _0x15e9b9, _0x50f892, _0x40bfdd) {
                    return _0x2fd7b3(_0x15e9b9, _0x50f892, _0x40bfdd);
                },
                'vMaRn': function (_0x4df3e5, _0x20260b) {
                    return _0x4df3e5(_0x20260b);
                },
                'STfba': '🔒\x20Moderato' + _0x3bce83(0x51b, '@Ss8') + _0x3bce83(0x7f5, '9M@a'),
                'plnNw': _0x3bce83(0x28d, 'ZS%t') + 'essage\x20han' + _0x3bce83(0x557, '@Ss8'),
                'JDqQT': _0x3bce83(0x8e2, 'bI!F') + 'imit'
            };
        try {
            if (!_0x557661[_0x3bce83(0x8fc, 'ih4U')])
                return;
            const _0x23954a = _0x557661[_0x3bce83(0x315, 'VbOS')][_0x3bce83(0x73f, '(49)')];
            if (_0x4032d2['ZRKOB'](isSystemJid, _0x23954a))
                return;
            await _0x4032d2['gOUzo'](waitForCommands), _0x4032d2['ZRKOB'](cacheMessage, _0x557661);
            const _0x23826d = _0x4032d2[_0x3bce83(0x6b0, 'dxeI')](getMessageContent, _0x557661);
            let _0x55271c = [];
            if (_0x23826d) {
                const _0x3842c6 = Object['keys'](_0x23826d), _0x9dd527 = [
                        _0x4032d2[_0x3bce83(0xa1d, 'dxeI')],
                        _0x4032d2[_0x3bce83(0x23c, '8*C0')]
                    ];
                _0x55271c = _0x3842c6[_0x3bce83(0x6bb, 'K%s%')](_0x2d17ac => !_0x9dd527[_0x3bce83(0x65c, 'fr)d')](_0x2d17ac));
            }
            const _0x4b3e85 = _0x557661[_0x3bce83(0x6dd, 'ih4U')][_0x3bce83(0xa75, '%iYw')] ? _0x5e48e7['user']['id'] : _0x557661[_0x3bce83(0x6f8, 'eo]Y')]['participan' + 't'] || _0x557661[_0x3bce83(0x7da, 'aUOA')][_0x3bce83(0x8af, 'Z&DW')], _0x211074 = _0x23954a[_0x3bce83(0x65d, 'cl&d')](_0x3bce83(0x74c, 'Dzp9'));
            let _0x58b9a7 = null;
            if (_0x211074)
                try {
                    _0x58b9a7 = await _0x5e48e7[_0x3bce83(0x510, 'eCWM') + 'ata'](_0x23954a);
                } catch (_0x4ef681) {
                }
            _0x211074 && _0x4032d2[_0x3bce83(0x51f, 'hKmO')](addMessage, _0x23954a, _0x4b3e85);
            if (!_0x23826d || _0x4032d2[_0x3bce83(0x2bf, 'ZS%t')](_0x55271c['length'], 0x0))
                return;
            let _0x34bfb9 = '';
            if (_0x23826d[_0x3bce83(0x94b, '(49)') + 'on'])
                _0x34bfb9 = _0x23826d['conversati' + 'on'];
            else {
                if (_0x23826d['extendedTe' + _0x3bce83(0x3f3, 'eCWM')])
                    _0x34bfb9 = _0x23826d[_0x3bce83(0x8b3, 'VbOS') + _0x3bce83(0x64b, 'W#(8')][_0x3bce83(0x366, 'cl&d')] || '';
                else {
                    if (_0x23826d[_0x3bce83(0x5f1, '6#U$') + 'ge'])
                        _0x34bfb9 = _0x23826d[_0x3bce83(0x614, 'sOIM') + 'ge'][_0x3bce83(0xa48, 'W#(8')] || '';
                    else
                        _0x23826d[_0x3bce83(0x880, '9M@a') + 'ge'] && (_0x34bfb9 = _0x23826d[_0x3bce83(0x309, 'hKmO') + 'ge']['caption'] || '');
                }
            }
            _0x34bfb9 = _0x4032d2[_0x3bce83(0x5f7, 'K%s%')](_0x34bfb9, '')[_0x3bce83(0x754, 'eCWM')]();
            const _0x3312ab = {
                'from': _0x23954a,
                'sender': _0x4b3e85,
                'isGroup': _0x211074,
                'groupMetadata': _0x58b9a7,
                'isOwner': _0x4032d2[_0x3bce83(0x913, 'dxeI')](isOwner, _0x4b3e85),
                'isAdmin': await _0x4032d2[_0x3bce83(0x342, 'Fpez')](isAdmin, _0x5e48e7, _0x4b3e85, _0x23954a, _0x58b9a7),
                'isBotAdmin': await _0x4032d2[_0x3bce83(0x45a, '9M@a')](isBotAdmin, _0x5e48e7, _0x23954a, _0x58b9a7),
                'isMod': _0x4032d2['ZRKOB'](isMod, _0x4b3e85),
                'prefix': _0x2523a0[_0x3bce83(0x616, '))Nx')],
                'body': _0x34bfb9,
                'reply': _0x1a5ef9 => _0x5e48e7[_0x3bce83(0x4e2, '[AjO') + 'e'](_0x23954a, { 'text': _0x1a5ef9 }, { 'quoted': _0x557661 }),
                'react': _0x32452f => _0x5e48e7[_0x3bce83(0x4ed, 'VX^@') + 'e'](_0x23954a, {
                    'react': {
                        'text': _0x32452f,
                        'key': _0x557661[_0x3bce83(0x5d7, '6#U$')]
                    }
                })
            };
            await handleAutoReact(_0x5e48e7, _0x557661, _0x3312ab);
            const _0x5d331f = await _0x4032d2[_0x3bce83(0x58a, 'jobK')](handleButtonResponse, _0x5e48e7, _0x557661, _0x3312ab);
            if (_0x5d331f)
                return;
            _0x211074 && (await _0x4032d2[_0x3bce83(0x7e9, 'Kh1Y')](handleAntilink, _0x5e48e7, _0x557661, _0x58b9a7), await _0x4032d2[_0x3bce83(0x298, 'dxeI')](handleAntitag, _0x5e48e7, _0x557661, _0x58b9a7), await _0x4032d2[_0x3bce83(0x6a9, 'VYw$')](handleAntiSticker, _0x5e48e7, _0x557661, _0x58b9a7), await _0x4032d2[_0x3bce83(0x31f, 'Fpez')](handleAntiGroupMention, _0x5e48e7, _0x557661, _0x58b9a7));
            if (_0x211074 && !_0x557661[_0x3bce83(0x3f9, 'Gz#P')][_0x3bce83(0x6c9, 'jH^F')]) {
                const _0x253607 = _0x4032d2[_0x3bce83(0x279, '!6eZ')](isGroupLocked, _0x23954a);
                if (_0x253607) {
                    const _0x8dc7ac = await _0x4032d2[_0x3bce83(0x4c7, '(49)')](isAdmin, _0x5e48e7, _0x4b3e85, _0x23954a, _0x58b9a7);
                    if (!_0x8dc7ac && !_0x4032d2[_0x3bce83(0xa63, 'K%s%')](isOwner, _0x4b3e85)) {
                        await _0x5e48e7[_0x3bce83(0x2dc, 'pk&V') + 'e'](_0x23954a, { 'delete': _0x557661['key'] });
                        return;
                    }
                }
            }
            if (_0x211074 && !_0x557661['key'][_0x3bce83(0x2ad, '[AjO')]) {
                const _0x351ef2 = _0x4032d2[_0x3bce83(0x410, 'y7P]')](isMuted, _0x23954a, _0x4b3e85);
                if (_0x351ef2) {
                    await _0x5e48e7['sendMessag' + 'e'](_0x23954a, { 'delete': _0x557661[_0x3bce83(0x995, 'B9Tk')] });
                    return;
                }
            }
            if (!_0x34bfb9[_0x3bce83(0x4fd, 'Gz#P')](_0x2523a0['prefix']))
                return;
            const _0x27ca8a = _0x34bfb9[_0x3bce83(0x66b, 'K%s%')](_0x2523a0['prefix']['length'])['trim']()['split'](/\s+/), _0x4754aa = _0x27ca8a['shift']()['toLowerCas' + 'e'](), _0x89ec0b = commands['get'](_0x4754aa);
            if (!_0x89ec0b)
                return;
            if (_0x2523a0[_0x3bce83(0x470, 'Dzp9')] && !isOwner(_0x4b3e85))
                return;
            if (_0x89ec0b[_0x3bce83(0x24f, 'qyfM')] && !_0x4032d2[_0x3bce83(0x3dd, 'O@hb')](isOwner, _0x4b3e85))
                return _0x5e48e7[_0x3bce83(0x368, 'hKmO') + 'e'](_0x23954a, { 'text': _0x2523a0[_0x3bce83(0x819, 'Fpez')][_0x3bce83(0x910, 'y7P]')] }, { 'quoted': _0x557661 });
            if (_0x89ec0b[_0x3bce83(0x936, '8*C0')] && !isMod(_0x4b3e85) && !_0x4032d2['vMaRn'](isOwner, _0x4b3e85))
                return _0x5e48e7[_0x3bce83(0x32f, '!6eZ') + 'e'](_0x23954a, { 'text': _0x4032d2[_0x3bce83(0x870, '9M@a')] }, { 'quoted': _0x557661 });
            if (_0x89ec0b[_0x3bce83(0x9e2, 'fr)d')] && !_0x211074)
                return _0x5e48e7[_0x3bce83(0x9a3, 'K%s%') + 'e'](_0x23954a, { 'text': _0x2523a0[_0x3bce83(0x67a, 'VYw$')][_0x3bce83(0x2cb, 'W#(8')] }, { 'quoted': _0x557661 });
            if (_0x89ec0b[_0x3bce83(0xa96, 'dxeI')] && !_0x3312ab[_0x3bce83(0x50d, 'ih4U')] && !isOwner(_0x4b3e85))
                return _0x5e48e7[_0x3bce83(0x6cb, 'dxeI') + 'e'](_0x23954a, { 'text': _0x2523a0[_0x3bce83(0xa90, '@Ss8')][_0x3bce83(0x3f5, 'jH^F')] }, { 'quoted': _0x557661 });
            if (_0x89ec0b[_0x3bce83(0x202, 'sOIM') + _0x3bce83(0x902, 'sOIM')] && !_0x3312ab[_0x3bce83(0xa55, '[AjO')])
                return _0x5e48e7[_0x3bce83(0x1fc, 'Z&DW') + 'e'](_0x23954a, { 'text': _0x2523a0['messages'][_0x3bce83(0x318, 'XzzT') + _0x3bce83(0x943, 'qyfM')] }, { 'quoted': _0x557661 });
            console[_0x3bce83(0x3cf, '[qEW')](_0x3bce83(0x54b, 'VX^@') + '\x20' + _0x4754aa + _0x3bce83(0xa29, 'Z&DW') + _0x4032d2[_0x3bce83(0xa2f, 'Z&DW')](normalizeJid, _0x4b3e85)), await _0x89ec0b['execute'](_0x5e48e7, _0x557661, _0x27ca8a, _0x3312ab);
        } catch (_0x2c421b) {
            console[_0x3bce83(0x421, '!$R8')](_0x4032d2[_0x3bce83(0x429, 'B9Tk')], _0x2c421b);
            if (_0x2c421b[_0x3bce83(0xab9, 'O@hb')]?.['includes'](_0x4032d2['JDqQT']))
                return;
            try {
                await _0x5e48e7[_0x3bce83(0x68f, 'aUOA') + 'e'](_0x557661[_0x3bce83(0x8ac, 'qyfM')]['remoteJid'], { 'text': _0x2523a0[_0x3bce83(0x71f, 'pk&V')][_0x3bce83(0xa58, 'B9Tk')] + '\x0a' + _0x2c421b[_0x3bce83(0x720, 'bI!F')] }, { 'quoted': _0x557661 });
            } catch (_0xe4fdba) {
            }
        }
    };
export {
    handleMessage,
    handleGroupUpdate,
    handleAntilink,
    handleAntitag,
    handleAntiSticker,
    handleAntiGroupMention,
    handleAutoReact,
    handleMessageDelete,
    cacheMessage,
    handleButtonResponse,
    isOwner,
    isAdmin,
    isBotAdmin,
    isMod,
    normalizeJid,
    isMuted,
    mutedUsers
};