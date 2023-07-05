const normalizer = (data) => {
    switch (typeof data) {
        case "object": {
            if (data === null) return null;

            switch (Array.isArray(data)) {
                case true:
                    return data.reduce((acc, ele) => {
                        ele = normalizer(ele);
                        acc[ele.id] = ele;
                        return acc;
                    }, {});

                default:
                    return Object.entries(data).reduce((acc, [key, value]) => {
                        value = normalizer(value);
                        acc[key] = value;
                        return acc;
                    }, {});
            };
        };

        case "undefined":
            return null;

        default:
            return data;
    };
};

export default normalizer;
