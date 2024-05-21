"""Common settings for Unitboard"""

import logging

log = logging.getLogger('_unitboard')


def plugin_settings(settings):
    """
    Common settings for Unitboard.
    """


    """
    FRONTEND REACT APP staticfiles.
    """
    # Used in custom Paver tasks (see: openedx/features/_customisations/pavelib/assets.py):
    settings.UNITBOARD_FRONTEND_PATH = settings.OPENEDX_ROOT / 'features' / '_unitboard' / 'frontend' / 'unitboard'

    # Frontend assets pickup:
    settings.WEBPACK_LOADER.update({
        'UNITBOARD': {
            'BUNDLE_DIR_NAME': '',
            'STATS_FILE': (
                settings.OPENEDX_ROOT / 'features' / '_unitboard' / 'frontend' / 'unitboard' / 'build' /
                'static' / 'unitboard-webpack-stats.json'
            )
        },
    })

    settings.STATICFILES_DIRS.append((
        settings.OPENEDX_ROOT / 'features' / '_unitboard' / 'frontend' / 'unitboard' / 'build' / 'static'
    ))
