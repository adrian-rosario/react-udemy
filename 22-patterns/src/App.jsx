import Accordion from "./components/accordion/Accordion";
import Place from "./components/search/Place";
// import AccordionTitle from "./components/accordion/AccordionTitle";
import SearchList from "./components/search/SearchList";

import { PLACES } from "./components/search/mockData";

// - before grouped component
// import AccordionItem from "./components/accordion/AccordionItem";

function App() {
  return (
    <>
      <h1>React Patterns</h1>

      <section>
        <h2>Accordion example</h2>
        <div>
          <Accordion className='accordion'>
            <Accordion.item id='ab1'>
              <Accordion.title
                title=' Item One Title...'
                className='accordion-item-title'
              ></Accordion.title>
              <Accordion.content className='accordion-item-content'>
                <article>
                  <p>Some paragraph about the information.</p>
                  <p>A second paragraph about details</p>
                </article>
              </Accordion.content>
            </Accordion.item>

            <Accordion.item id='ab2'>
              <Accordion.title
                title='Item Two Title...'
                className='accordion-item-title'
              ></Accordion.title>
              <Accordion.content className='accordion-item-content'>
                <article>
                  <p>Some paragraph about the Item Two information.</p>
                  <p>A second paragraph about Item Two details</p>
                </article>
              </Accordion.content>
            </Accordion.item>
          </Accordion>
        </div>
      </section>

      <section>
        <h2>Search</h2>
        <SearchList items={PLACES} itemKeyFunction={(item) => item.id}>
          {(item) => <Place item={item} />}
        </SearchList>
        <hr />
        <SearchList
          items={["item one", "thing two", "something three"]}
          itemKeyFunction={(item) => item}
        >
          {(item) => item}
        </SearchList>
      </section>
    </>
  );
}

export default App;
/*
      <div>
        <Accordion className='accordion'>
          <Accordion.item title='Item One Title...' id='ab1'>
            <article>
              <p>Some paragraph about the information.</p>
              <p>A second paragraph about details</p>
            </article>
          </Accordion.item>

          <Accordion.item title='Item Two Title...' id='ab2'>
            <article>
              <p>Some paragraph about the Item Two information.</p>
              <p>A second paragraph about Item Two details</p>
            </article>
          </Accordion.item>
        </Accordion>
      </div>
*/
