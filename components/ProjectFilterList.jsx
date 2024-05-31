import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { getResponseTypeStyle, Size } from '../utils/typography.utils'
import Button from './Button'
import ProjectFilter from './ProjectFilter'

const Container = styled.div`
  display: flex;
  align-items: baseline;
`

const List = styled.ul`
  display: flex;
  list-style: none;
  align-items: center;
  flex-wrap: wrap;

  > * {
    margin-block-end: 0.3em;
    margin-inline-end: 1em;
  }
`

const Label = styled.span`
  font-weight: 400;
  white-space: nowrap;
  margin-inline-end: 0.9em;
`

const ResetButton = styled(Button)`
  ${getResponseTypeStyle(Size.small)};
  padding-block-start: 0.05em;
  padding-block-end: 0.05em;
`

const Count = styled.span`
  color: var(--theme-bg-02);
  ${getResponseTypeStyle(Size.small)};
`

const ToggleButton = styled(Button)`
  margin-left: 1em;
  font-weight: 400;
  color: var(--theme-bg-04);
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    color: var(--theme-bg-04);
    text-decoration: underline;
  }
`

export default function ProjectFilterList({
  filters = {},
  selectedFilters = [],
  onToggle = () => {},
  onReset = () => {},
}) {
  const [showAllFilters, setShowAllFilters] = useState(false);
  const filterEntries = Object.entries(filters);
  const filteredEntries = filterEntries.filter(([, count]) => count > 1);
  const additionalFilters = filterEntries.filter(([, count]) => count <= 1);

  if (filterEntries.length === 0) {
    return null;
  }

  return (
    <Container>
      <Label>Filter by:</Label>
      <List>
        {filteredEntries
          .sort((a, b) => b[1] - a[1])
          .map(([filter, count]) => (
            <li key={filter}>
              <ProjectFilter
                selected={selectedFilters.includes(filter)}
                onToggle={() => onToggle(filter)}
              >
                {filter} <Count>[{count}]</Count>
              </ProjectFilter>
            </li>
          ))}
        {showAllFilters && additionalFilters
          .sort((a, b) => b[1] - a[1])
          .map(([filter, count]) => (
            <li key={filter}>
              <ProjectFilter
                selected={selectedFilters.includes(filter)}
                onToggle={() => onToggle(filter)}
              >
                {filter} <Count>[{count}]</Count>
              </ProjectFilter>
            </li>
          ))}
        {additionalFilters.length > 0 && (
          <ToggleButton onClick={() => setShowAllFilters(!showAllFilters)}>
            {showAllFilters ? 'limit filter options' : '+ show more filters'}
          </ToggleButton>
        )}
        {selectedFilters.length > 0 && (
          <ResetButton onClick={onReset}>Reset</ResetButton>
        )}
      </List>
    </Container>
  );
}

ProjectFilterList.propTypes = {
  filters: PropTypes.objectOf(PropTypes.number),
  selectedFilters: PropTypes.arrayOf(PropTypes.string),
  onToggle: PropTypes.func,
  onReset: PropTypes.func,
}