# GrowthScope Testing

## Validation
### HTML

The HTML was tested using the Nu HTML Checker.

- Initial testing identified an unclosed `div` in the Funnel Data section.
- The missing closing tag was added and the document was tested again.
- Final result: no errors or warnings.

### CSS

The CSS was tested using the W3C CSS Validator.

- An invalid margin declaration was corrected during development.
- Final result: no CSS errors and the stylesheet successfully validated.

### JavaScript

JavaScript was tested using JSHint.

- JSHint was configured to recognise ES6 syntax during testing because GrowthScope uses features such as `const`, `let` and template literals.
- After configuring the checker for ES6, no JSHint warnings remained.

## Functional Testing

## Responsive Testing

## Accessibility Testing

## Browser Testing

## Bugs and Fixes