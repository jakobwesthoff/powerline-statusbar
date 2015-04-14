export function upperCaseFirst(str) {
    var lowercase = str.toLowerCase();
    var first = lowercase.substr(0, 1);
    var rest = lowercase.substring(1);

    return `${first.toUpperCase()}${rest}`;
}