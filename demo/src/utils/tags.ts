type MergeTags = {
  [key: string]: {
    [key: string]: number | string;
  };
};

export const parseTags = (source: Record<string, string[]>): MergeTags => {
  let tags = {};
  Object.keys(source).forEach(key => {
    tags[key] = source[key].reduce(
      (prevValues: any, value: string) => ({
        ...prevValues,
        [value]: `${value} value`,
      }),
      {},
    );
  });
  return tags;
};
