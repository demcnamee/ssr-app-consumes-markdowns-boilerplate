// Transpile all code following this line with babel and use babel/preset-env preset.
require('@babel/register');
const port = process.env.PORT || 3000;
const app = require('./server');

app.listen(port, () => {
  console.log(`app listinening on port ${port}`);
});
