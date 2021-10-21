export function validate(validatable) {
    let isValid = true;
    validatable.required &&
        (isValid = isValid && validatable.value.toString().trim().length !== 0);
    validatable.minLength != null &&
        typeof validatable.value === "string" &&
        (isValid = isValid && validatable.value.length >= validatable.minLength);
    validatable.maxLength != null &&
        typeof validatable.value === "string" &&
        (isValid = isValid && validatable.value.length <= validatable.maxLength);
    validatable.min != null &&
        typeof validatable.value === "number" &&
        (isValid = isValid && validatable.value >= validatable.min);
    validatable.max != null &&
        typeof validatable.value === "number" &&
        (isValid = isValid && validatable.value <= validatable.max);
    return isValid;
}
//# sourceMappingURL=validation.js.map