import React, { useState, useEffect, useCallback } from 'react';
import './Form.css';
import postcss from 'postcss';
import postcssAmplify from 'postcss-amplify';
import Tooltip from 'react-tooltip';
import { DEFAULT_INPUT } from '../constants/defaultInput';

const Form = () => {
  const [input, setInput] = useState(DEFAULT_INPUT);
  const [output, setOutput] = useState();
  const [maxBreakpoint, setMaxBreakpoint] = useState('0px');
  const [blockText, setBlockText] = useState('');
  const [excludedBlocks, setExcludedBlocks] = useState([]);
  const [hideArrow, setHideArrow] = useState(false);

  const handleChange = useCallback(() => {
    postcss([postcssAmplify({
      maxBreakpoint,
      excludedBlocks
    })]).process(input, { from: undefined }).then((result) => {
      setOutput(result.css);
    }).catch((err) => {
      return false;
    });
  }, [input, maxBreakpoint, excludedBlocks]);

  const handleAddBlock = (e) => {
    e.preventDefault();

    if (blockText) {
      setExcludedBlocks([...excludedBlocks, ...[blockText]]);
      setBlockText('');
    }
  }

  const handleRemoveBlock = (e, i) => {
    e.preventDefault();
    const updatedBlocks = [...excludedBlocks];
    updatedBlocks.splice(i, 1);
    setExcludedBlocks(updatedBlocks);
  }

  const handleClear = (e) => {
    e.preventDefault();
    setInput('');
  }

  useEffect(() => {
    handleChange();
  }, [input, maxBreakpoint, excludedBlocks, handleChange])

  useEffect(() => {
    if (!input) {
      setHideArrow(false);
    }
  }, [input])

  return (
    <form className="form">
      <div className="form__controls">
        <div className="form__opts">
          <h4>Options</h4>

          <div className="form__opts-group">
            <label htmlFor="maxBreakpoint">Max breakpoint: <button className="form__tooltip-btn" data-tip data-for="maxBreakpointTooltip" onClick={(e) => e.preventDefault()}><span className="form__tooltip-icon">i</span></button></label>
            <input className="form__opts-input" id="maxBreakpoint" type="text" value={maxBreakpoint} onChange={(e) => setMaxBreakpoint(e.target.value)} />
            <Tooltip className="form__tooltip" id="maxBreakpointTooltip" place="bottom" type="light" effect="solid" aria-haspopup="true">Media queries below this breakpoint will be preserved</Tooltip>
          </div>

          <div className="form__opts-group">
            <label htmlFor="blockText">Blocks/prefixes to exclude: <button className="form__tooltip-btn" data-tip data-for="blocksTooltip" onClick={(e) => e.preventDefault()}><span className="form__tooltip-icon">i</span></button></label>
            <input className="form__opts-input" id="blockText" type="text" value={blockText} onChange={(e) => setBlockText(e.target.value)} />
            <button className="form__opts-btn" onClick={handleAddBlock}>Add</button>
            <Tooltip className="form__tooltip" id="blocksTooltip" place="bottom" type="light" effect="solid" aria-haspopup="true">Class blocks or prefixes to exclude (especially useful with BEM or other namespacing methodologies)</Tooltip>
          </div>

          <ul className="form__opts-blocks">
            {excludedBlocks.map((block, i) => {
              return(
                <li key={i} className="form__opts-block">{block} <button onClick={(e) => handleRemoveBlock(e, i)}>✕</button></li>
              );
            })}
          </ul>
        </div>

        <button onClick={handleClear}>Clear CSS</button>
      </div>

      <div className={`form__inputs ${hideArrow ? 'form__inputs--no-arrow' : ''}`}>
        <div className="form__column form__column--input">
          <label className="form__label" htmlFor="input">Input</label>
          <textarea className="form__textarea" id="input" value={input} onChange={(e) => setInput(e.target.value)} onFocus={() => setHideArrow(true)} />
        </div>

        <div className="form__column form__column--output">
          <label className="form__label" htmlFor="output">Output</label>
          <textarea className="form__textarea" id="output" value={output} readOnly />
        </div>
      </div>
    </form>
  );
};

export default Form;