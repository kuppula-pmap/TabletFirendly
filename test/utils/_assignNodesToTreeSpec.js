import utils from '../../src/utils';

describe('(Utility) _assignNodesToTree', () => {
  it('should assign selected nodes to a tree', () => {
    let initialTree = {
      'id': 0,
      'name': 'Root',
      'children': [
        {
          'id': 1831,
          'name': 'Airport Operations',
          'children': [],
          'toggled': false,
          'selected': false
        },
        {
          'id': 1485,
          'name': 'Bleaching',
          'children': [
            {
              'id': 2092,
              'name': 'QA',
              'children': [],
              'toggled': false,
              'selected': false
            }
          ],
          'toggled': false,
          'selected': false
        },
        {
          'id': 1768,
          'name': 'Department',
          'children': [
            {
              'id': 1769,
              'name': 'Area\/Zone',
              'children': [
                {
                  'id': 1770,
                  'name': 'ETU',
                  'children': [],
                  'toggled': false,
                  'selected': false
                }
              ],
              'toggled': false,
              'selected': false
            }
          ],
          'toggled': false,
          'selected': false
        },
      ],
      'toggled': false,
      'selected': false
    };

    let nodes = [ { 'id': 0, 'name': 'Root'}, { 'id': 1831, 'name': 'Airport Operations'}, { 'id': 2092, 'name': 'QA'}, { 'id': 1770, 'name': 'ETU' } ];

    const actual = utils.assignNodesToTree(initialTree, nodes);

    let expected = {
      'id': 0,
      'name': 'Root',
      'children': [
        {
          'id': 1831,
          'name': 'Airport Operations',
          'children': [],
          'toggled': false,
          'selected': true
        },
        {
          'id': 1485,
          'name': 'Bleaching',
          'children': [
            {
              'id': 2092,
              'name': 'QA',
              'children': [],
              'toggled': false,
              'selected': true
            }
          ],
          'toggled': true,
          'selected': false
        },
        {
          'id': 1768,
          'name': 'Department',
          'children': [
            {
              'id': 1769,
              'name': 'Area\/Zone',
              'children': [
                {
                  'id': 1770,
                  'name': 'ETU',
                  'children': [],
                  'toggled': false,
                  'selected': true
                }
              ],
              'toggled': true,
              'selected': false
            }
          ],
          'toggled': false,
          'selected': false
        },
      ],
      'toggled': true,
      'selected': true
    };
    expect(actual).toEqual(expected);
  });
});
