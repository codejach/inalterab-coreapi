import pkg from '../../package.json'; 

export const _get = (_, res) => {
  res
    .status(200).json({
      name: pkg.name,
      author:pkg.author,
      description: pkg.description,
      version: pkg.version
    });
};
