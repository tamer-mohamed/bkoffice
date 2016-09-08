import { Form } from 'formsy-react';
import React from 'react';
import { Link } from 'react-router';
import { Button } from '@sketchpixy/rubix';

import InputField from './Input';
import Select from './Select';
import Dynamic from './Dynamic';


class FormBuilder extends React.Component {

  render(){
    const { schema,onSubmit,cancelLink,submitText } = this.props;

    return (
        <Form onSubmit={(values,reset)=> {onSubmit(values); reset();}}>
          {schema.map((field, k) =>{
            switch(field.type){
              case 'text':
                return <InputField value={field.default} key={k} type={field.type} id={field.id} label={field.title}
                                   controlId={field.id} {...field.props} />;
              case 'select':
                return <Select key={k} value={field.default} label={field.title}
                               controlId={field.id} {...field.props} />;
              case "dynamic":
                return <Dynamic defaultValues={field.default} id={field.id} key={k}
                                schema={field.schema}
                                controlId={field.id} {...field.props} />;
                break;
            }
          })}
          <div style={{margin:"10px 0"}}>
            {cancelLink && <Link to={cancelLink} className="btn btn-default" type="submit">cancel</Link>}
            {' '}
            <button className="btn-primary btn btn-default">{submitText}</button>
          </div>
        </Form>
    );


  }
}

FormBuilder.defaultProps = {
  submitText: "submit"
}

FormBuilder.propTypes = {
  schema: React.PropTypes.array.isRequired,
  onSubmit: React.PropTypes.func.isRequired
};

export default FormBuilder;
