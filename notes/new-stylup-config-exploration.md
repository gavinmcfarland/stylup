## Idea 1

### Questions

-   Should there be a `rules` property in the config?
-   Should and how can attributes and classes be scoped to elements?

Pros:

-   Less repetition when defining multiple tags/attributes/classes
-   Makes more sense to group them?
-   Doesn't give wrong impression of the order. Order can be controlled

Con:

-   Doesn't allow for attributes to be related to a specific tag? (Unless you let user provide rules inside tag as well?)

```js
export default {
    rules: {
        tag: [
            {
                name: "/^[A-Z]/",
                transform(name) {
                    return `x-${name.toLowercase()}`;
                },
            },
        ],
        attribute: [
            {
                name: /^+-/,
                params: [],
                transform(name) {
                    return `data-${name.replace("+", "")}`;
                },
            },
        ],
        class: [
            {
                name: ["/(p)-/", "/(m)-/"],
                params: ["t", "r", "b", "l"],
                style({ rule, args, str }) {
                    if (args) {
                        let values = args;

                        switch (values.length) {
                            case 1:
                                values.push(values[0]);
                            case 2:
                                values.push(values[0]);
                            case 3:
                                values.push(values[1]);
                        }

                        for (let [index, side] of rule.children.entries()) {
                            str`--${rule.class}${side}: ${values[index]};\n`;
                        }

                        return str();
                    }
                },
                transform({ match }) {
                    return match[1];
                },
            },
        ],
    },
};
```

## Idea 2

```js
export default {
    rules: [
        {
            type: "element",
            name: "/^[A-Z]/",
            transform(name) {
                return `x-${name.toLowercase()}`;
            },
        },
        {
            type: "attr",
            name: /^+-/,
            params: [],
            transform(name) {
                return `data-${name.replace("+", "")}`;
            },
        },
        {
            type: "class",
            name: ["/(p)-/", "/(m)-/"],
            params: ["t", "r", "b", "l"],
            style({ rule, args, str }) {
                if (args) {
                    let values = args;

                    switch (values.length) {
                        case 1:
                            values.push(values[0]);
                        case 2:
                            values.push(values[0]);
                        case 3:
                            values.push(values[1]);
                    }

                    for (let [index, side] of rule.children.entries()) {
                        str`--${rule.class}${side}: ${values[index]};\n`;
                    }

                    return str();
                }
            },
            transform({ match }) {
                return match[1];
            },
        },
    ],
};
```
