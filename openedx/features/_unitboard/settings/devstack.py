"""Devstack settings for Unitboard"""


def plugin_settings(settings):
    """
    Devstack settings for Unitboard.
    """

    # Development configuration for Frontend assets pickup:
    settings.WEBPACK_LOADER.update({
        'UNITBOARD': {
            'BUNDLE_DIR_NAME': '',
            'STATS_FILE': (
                settings.OPENEDX_ROOT / 'features' / '_unitboard' / 'frontend' / 'unitboard' / 'public' /
                'dev-webpack-stats.json'
            )
        },
    })
