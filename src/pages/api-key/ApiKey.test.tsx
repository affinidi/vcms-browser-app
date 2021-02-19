import React from 'react';
import {render} from '@testing-library/react';
import ApiKeyPage from 'pages/api-key/ApiKey';

describe('Api Key Page test', () => {
  test('Component renders properly', () => {
    const {getByText} = render(<ApiKeyPage/>)

    const anchor = getByText('Generate API key hash here');

    expect(getByText('Generate API key hash')).toBeInTheDocument()
    expect(anchor).toBeInTheDocument()
    expect(anchor.closest('a')).toHaveAttribute(
      'href',
      'https://affinity-onboarding-frontend.staging.affinity-project.org/?source=vcms-api-sandbox'
    )
    expect(anchor.closest('a')).toHaveAttribute('target','_blank')
    expect(anchor.closest('a')).toHaveAttribute('rel','noreferrer noopener')
  })
})
