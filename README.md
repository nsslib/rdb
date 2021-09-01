# What is RDB
RDB (Redux Broadcasting) is created over Redux. Aim of the project is to remove reducers & actions and make a library similar [QT Signal Slot logic](https://doc.qt.io/qt-5/signalsandslots.html)  
With this library we can change master state values only emitting signals with values. eg: <code>rdb.broadcast('s_lang', 'fr')</code>

# Installation
You can install the lib from github: <code>yarn add https://github.com/nsslib/rdb</code>

# Usage Scenario
Lets say we have language code for changing the app language dynamically and we already set it into redux main state. I would like to emit changed lang code from one component with slots and then receive the signal from any listening components.

As we said, there is no actions and reducers.

``` javascript
// utils/Statemanager.js 

//This is your rdb file where you created your store and exported modified rdb for your app.

import { RDBroadcast } from "rdb";

// this is the global state for your app, there is no any other state will be defined in the app, just make one such that. I usually give names to keys starting with "s_" to indicate it is a signal.
let globalstate = {
  s_langcode: "en" // fr, tr, en etc...
}

const rdb = new RDBroadcast();
rdb.setInitialState(globalstate);
export default rdb
/**
 * Now rdb is instantiated and exported, use this instantiate to reach your global state.
 * /
```

``` javascript
// App.js your main file for the app.
// You typically define your routing inside App > Provider

import { Provider } from "rdb"; // use Provider from rdb, it is tha same provider as Redux.
import rdb from "@utils/Statemanager"

const App = () => {
  return (
    <Provider store={rdb.store}>
      <Header />
      <Footer />
    </Provider>
  );
};

```

Here is components that should communicate using RDB
``` javascript
// A Header component lets say Header.js
// Lets say we have defined more components such that.

// utils
import rdb from "@utils/globalstate";

const Header = () => {
  return (
    <Pressable onPress={() => {
      rdb.broadcast("s_lang", "tr")
    }}>
      <Text>I am a Header</Text>
    </Pressable>
  );
};

export default rdb.hoc(React.Fragmant, {}, Header);
// export default rdb.hoc<T>(React.Fragmant, {}, Header); also you can export it with interfaces.

```

``` javascript
// A Listener component lets say Footer.js
// Lets say we have defined more components such that.

// utils
import rdb from "@utils/globalstate";

interface Props {

  // signals
  s_lang: string // or you can define enums for that. It is up to you.
}

const Footer: React.FC<Props> = (props) => {
  return (
    <View>
      <Text>Current language is {props.s_lang}</Text>
    </View>
  );
};

export default rdb.hoc(React.Fragmant, {}, Header);
// export default rdb.hoc<T>(React.Fragmant, {}, Header); also you can export it with interfaces.

```